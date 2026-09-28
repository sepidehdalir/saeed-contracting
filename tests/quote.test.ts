import { test } from "node:test";
import assert from "node:assert/strict";
import { validateQuote } from "../src/lib/quote";
import { POST } from "../src/app/api/quote/route";
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
};
test("validation rejects malformed data and unpublished services", () => {
  for (const data of [
    null,
    [],
    { ...payload, email: "bad" },
    { ...payload, phone: "1" },
    { ...payload, name: "A\nB" },
    { ...payload, description: "short" },
    { ...payload, service: "electrical-services" },
    { ...payload, consent: false },
  ])
    assert.ok(validateQuote(data, ["general-repairs"]).error);
  assert.ok(validateQuote(payload, ["general-repairs"]).value);
});
test("delivery requires verified challenge and successful provider response", async () => {
  const originals = { ...process.env };
  const originalFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = "test";
  process.env.QUOTE_FROM_EMAIL = "test@notifications.saeedcontracting.ca";
  process.env.TURNSTILE_SECRET_KEY = "test";
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test";
  const req = () =>
    new Request("https://saeedcontracting.ca/api/quote", {
      method: "POST",
      headers: {
        origin: "https://saeedcontracting.ca",
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  try {
    let sent = 0;
    globalThis.fetch = async () => Response.json({ success: false });
    assert.equal((await POST(req())).status, 400);
    globalThis.fetch = async (input, init) => {
      if (String(input).includes("siteverify"))
        return Response.json({
          success: true,
          action: "quote",
          hostname: "saeedcontracting.ca",
        });
      sent++;
      const body = JSON.parse(String(init?.body));
      assert.deepEqual(body.to, ["info@saeedcontracting.ca"]);
      assert.equal(body.reply_to, "qa@example.com");
      assert.ok(body.text.includes(payload.description));
      return Response.json({ id: "test-provider-id" });
    };
    assert.equal((await POST(req())).status, 200);
    assert.equal(sent, 1);
    globalThis.fetch = async (input) =>
      String(input).includes("siteverify")
        ? Response.json({
            success: true,
            action: "quote",
            hostname: "wrong.example",
          })
        : Response.json({ id: "unexpected" });
    assert.equal((await POST(req())).status, 400);
    globalThis.fetch = async (input) =>
      String(input).includes("siteverify")
        ? Response.json({
            success: true,
            action: "quote",
            hostname: "saeedcontracting.ca",
          })
        : Response.json({ error: "provider unavailable" }, { status: 500 });
    assert.equal((await POST(req())).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of [
      "RESEND_API_KEY",
      "QUOTE_FROM_EMAIL",
      "TURNSTILE_SECRET_KEY",
      "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
    ]) {
      if (originals[key] === undefined) delete process.env[key];
      else process.env[key] = originals[key];
    }
  }
});
