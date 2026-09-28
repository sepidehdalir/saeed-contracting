import { test } from "node:test";
import assert from "node:assert/strict";
import { validateQuote } from "../src/lib/quote";
import { POST } from "../src/app/api/quote/route";
import { quoteDeliveryConfig } from "../src/lib/quote-delivery";
const payload = {
  name: "Website QA",
  phone: "6045550123",
  email: "qa@example.com",
  city: "North Vancouver",
  service: "general-repairs",
  description: "A test repair description with enough detail.",
  timing: "Flexible",
  consent: true,
  website: "",
  token: "test-token",
  startedAt: Date.now() - 10000,
  submissionId: "7f41eb23-9870-4a3c-9a32-c8f6a6baecdd",
  submittedAt: Date.now(),
};
const request = (
  body: unknown = payload,
  origin = "https://saeedcontracting.ca",
) =>
  new Request("https://saeedcontracting.ca/api/quote", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });

test("validation rejects malformed data, recipient injection and unpublished services", () => {
  for (const data of [
    null,
    [],
    { ...payload, email: "bad" },
    { ...payload, email: "a,b@example.com" },
    { ...payload, phone: "1" },
    { ...payload, name: "A\nB" },
    { ...payload, description: "short" },
    { ...payload, service: "electrical-services" },
    { ...payload, consent: false },
  ])
    assert.ok(validateQuote(data, ["general-repairs"]).error);
  assert.ok(validateQuote(payload, ["general-repairs"]).value);
});

test("protected two-email delivery, stable replay and safe provider failures", async (t) => {
  const originals = { ...process.env };
  const originalFetch = globalThis.fetch;
  const originalLog = console.info;
  const originalError = console.error;
  const logs: unknown[][] = [];
  console.info = (...args) => {
    logs.push(args);
  };
  console.error = (...args) => {
    logs.push(args);
  };
  process.env.RESEND_API_KEY = "test-only-server-secret";
  process.env.QUOTE_FROM_EMAIL =
    "Saeed Contracting <quotes@notifications.saeedcontracting.ca>";
  process.env.TURNSTILE_SECRET_KEY = "test";
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test";
  const verified = () =>
    Response.json({
      success: true,
      action: "quote",
      hostname: "saeedcontracting.ca",
    });
  try {
    await t.test("invalid requests never reach provider", async () => {
      globalThis.fetch = async () => {
        throw new Error("unexpected external call");
      };
      for (const [body, status] of [
        [{ ...payload, email: "bad" }, 400],
        [{ ...payload, website: "spam" }, 400],
        [{ ...payload, submissionId: "invalid" }, 400],
        [{ ...payload, submittedAt: 0 }, 400],
        [{ ...payload, description: "x".repeat(20000) }, 413],
      ] as const)
        assert.equal((await POST(request(body))).status, status);
      assert.equal(
        (await POST(request(payload, "https://evil.example"))).status,
        403,
      );
    });
    await t.test("failed challenge blocks sending", async () => {
      globalThis.fetch = async () => Response.json({ success: false });
      assert.equal((await POST(request())).status, 400);
      globalThis.fetch = async () =>
        Response.json({
          success: true,
          action: "quote",
          hostname: "evil.example",
        });
      assert.equal((await POST(request())).status, 400);
    });
    await t.test(
      "business notification and branded confirmation; duplicates reuse identical batch",
      async () => {
        const batches = new Map<string, string>();
        let accepted = 0;
        globalThis.fetch = async (input, init) => {
          if (String(input).includes("siteverify")) return verified();
          assert.equal(String(input), "https://api.resend.com/emails/batch");
          const key = new Headers(init?.headers).get("Idempotency-Key")!;
          const raw = String(init?.body);
          if (batches.has(key) && batches.get(key) !== raw)
            return Response.json(
              { secret: "provider details" },
              { status: 409 },
            );
          const emails = JSON.parse(raw);
          assert.equal(emails.length, 2);
          assert.deepEqual(emails[0].to, ["info@saeedcontracting.ca"]);
          assert.equal(emails[0].reply_to, payload.email);
          assert.equal(
            emails[0].subject,
            "New Quote Request — General Repairs — Website QA",
          );
          assert.ok(emails[0].text.includes(payload.description));
          assert.ok(
            emails[0].text.includes(
              new Date(payload.submittedAt).toISOString(),
            ),
          );
          assert.ok(
            emails[0].text.includes(
              "https://saeedcontracting.ca/request-a-quote",
            ),
          );
          assert.deepEqual(emails[1].to, [payload.email]);
          assert.equal(emails[1].reply_to, "info@saeedcontracting.ca");
          assert.equal(
            emails[1].subject,
            "We received your request — Saeed Contracting",
          );
          assert.ok(emails[1].text.includes("604-627-0166"));
          assert.ok(emails[1].html.includes("SAEED"));
          assert.ok(!emails[1].html.includes(payload.description));
          if (batches.has(key)) {
            if (batches.get(key) !== raw)
              return Response.json(
                { secret: "provider details" },
                { status: 409 },
              );
          } else {
            batches.set(key, raw);
            accepted++;
          }
          return Response.json({
            data: [{ id: "business-id" }, { id: "confirmation-id" }],
          });
        };
        assert.deepEqual(await (await POST(request())).json(), { ok: true });
        assert.equal(
          (await POST(request({ ...payload, token: "fresh-token" }))).status,
          200,
        );
        assert.equal(accepted, 1);
        const conflict = await POST(
          request({
            ...payload,
            description:
              "Different details for the same submission identifier.",
          }),
        );
        assert.equal(conflict.status, 409);
        assert.ok(!(await conflict.text()).includes("provider details"));
      },
    );
    await t.test(
      "provider rejection, malformed acceptance and timeout cannot claim success",
      async () => {
        for (const provider of [
          () =>
            Response.json(
              { message: "private-provider-detail" },
              { status: 500 },
            ),
          () => Response.json({ data: [{ id: "one-only" }] }),
          () => {
            throw new Error("private-timeout-detail");
          },
        ]) {
          globalThis.fetch = async (input) =>
            String(input).includes("siteverify") ? verified() : provider();
          const r = await POST(request());
          assert.ok(r.status >= 500);
          const text = await r.text();
          assert.ok(!text.includes("private-"));
          assert.ok(!text.includes("test-only-server-secret"));
        }
      },
    );
    await t.test(
      "firewall mode requires Vercel; no accidental unprotected sending",
      async () => {
        delete process.env.TURNSTILE_SECRET_KEY;
        delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
        delete process.env.QUOTE_FIREWALL_ENABLED;
        delete process.env.VERCEL;
        assert.equal(quoteDeliveryConfig().direct, false);
        assert.equal((await POST(request())).status, 503);
        process.env.QUOTE_FIREWALL_ENABLED = "true";
        assert.equal(quoteDeliveryConfig().direct, false);
        process.env.VERCEL = "1";
        assert.equal(quoteDeliveryConfig().direct, true);
        globalThis.fetch = async (input) => {
          assert.equal(String(input), "https://api.resend.com/emails/batch");
          return Response.json({ data: [{ id: "one" }, { id: "two" }] });
        };
        assert.equal(
          (await POST(request({ ...payload, token: "" }))).status,
          200,
        );
      },
    );
    const output = JSON.stringify(logs);
    for (const privateValue of [
      payload.email,
      payload.name,
      payload.description,
      "test-only-server-secret",
      "private-provider-detail",
    ])
      assert.ok(!output.includes(privateValue));
  } finally {
    globalThis.fetch = originalFetch;
    console.info = originalLog;
    console.error = originalError;
    for (const key of [
      "RESEND_API_KEY",
      "QUOTE_FROM_EMAIL",
      "TURNSTILE_SECRET_KEY",
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
      "QUOTE_FIREWALL_ENABLED",
      "VERCEL",
    ])
      if (originals[key] === undefined) delete process.env[key];
      else process.env[key] = originals[key];
  }
});
