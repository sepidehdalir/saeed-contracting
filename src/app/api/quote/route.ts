import { quoteDeliveryConfig, quoteEmails } from "@/lib/quote-delivery";
import { services } from "@/lib/services";
import { validateQuote } from "@/lib/quote";
import { site } from "@/lib/site";
export const runtime = "nodejs";
const reply = (error: string, status: number) =>
  Response.json(
    { error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = new Set([
    site.url,
    "https://www.saeedcontracting.ca",
    "https://saeed-contracting.vercel.app",
  ]);
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV !== "production")
    allowed.add("http://localhost:3000");
  if (!origin || !allowed.has(origin))
    return reply("Request origin is not allowed.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply("Unsupported request format.", 415);
  if (Number(request.headers.get("content-length") || 0) > 16384)
    return reply("Request is too large.", 413);
  let body: Record<string, unknown>;
  try {
    if (!request.body) return reply("Empty request.", 400);
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16384) {
        await reader.cancel();
        return reply("Request is too large.", 413);
      }
      chunks.push(value);
    }
    const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return reply("Invalid request.", 400);
    body = parsed;
  } catch {
    return reply("Invalid request.", 400);
  }
  if (body.website)
    return reply(
      "Unable to accept this request. Please contact us directly.",
      400,
    );
  const checked = validateQuote(
    body,
    services.map((s) => s.slug),
  );
  if (!checked.value)
    return reply(checked.error || "Check the form fields.", 400);
  const key = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const config = quoteDeliveryConfig();
  if (!key || !from || !config.direct)
    return reply(
      "Online sending is unavailable. Please email info@saeedcontracting.ca or call 604-627-0166.",
      503,
    );
  if (
    typeof body.startedAt !== "number" ||
    Date.now() - body.startedAt < 2500 ||
    Date.now() - body.startedAt > 86400000
  )
    return reply(
      "Please take a moment to check the form, then try again.",
      400,
    );
  if (
    config.turnstile &&
    (typeof body.token !== "string" || body.token.length > 2048 || !body.token)
  )
    return reply("Please complete the security check.", 400);
  if (
    typeof body.submissionId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      body.submissionId,
    ) ||
    typeof body.submittedAt !== "number" ||
    !Number.isSafeInteger(body.submittedAt) ||
    body.submittedAt > Date.now() + 60000 ||
    Date.now() - body.submittedAt > 23 * 3600000
  )
    return reply("Please refresh the page and try again.", 400);
  const submission = await digest(body.submissionId);
  try {
    if (config.turnstile) {
      const challenge = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: new URLSearchParams({
            secret: secret!,
            response: body.token as string,
            idempotency_key: body.submissionId,
          }),
          signal: AbortSignal.timeout(8000),
        },
      );
      if (!challenge.ok)
        return reply(
          "Security verification is unavailable. Please email or call us.",
          503,
        );
      const verified = await challenge.json();
      const hosts = new Set([...allowed].map((u) => new URL(u).hostname));
      if (
        !verified.success ||
        verified.action !== "quote" ||
        !hosts.has(verified.hostname)
      )
        return reply(
          "Security check expired or failed. Please try again.",
          400,
        );
    }
    const q = checked.value;
    const service =
      services.find((s) => s.slug === q.service)?.name ||
      (q.service === "other"
        ? "Other / Something else"
        : "Multiple services / not sure");
    const result = await fetch("https://api.resend.com/emails/batch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `quote-v2-${submission}`,
      },
      body: JSON.stringify(quoteEmails(q, service, body.submittedAt, from)),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) {
      console.error("quote_delivery_failed", {
        submission,
        status: result.status,
      });
      return reply(
        "Your request could not be sent. Please email or call us directly.",
        result.status === 409 ? 409 : 502,
      );
    }
    const sent = await result.json();
    if (
      !Array.isArray(sent.data) ||
      sent.data.length !== 2 ||
      !sent.data.every(
        (email: { id?: unknown }) => typeof email.id === "string" && email.id,
      )
    )
      return reply(
        "We could not confirm delivery. Please contact us directly.",
        502,
      );
    console.info("quote_delivery_accepted", {
      submission,
      emailIds: sent.data.map((email: { id: string }) => email.id),
    });
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    console.error("quote_delivery_unconfirmed", { submission });
    return reply(
      "We could not confirm that your request was sent. Please email or call us directly.",
      503,
    );
  }
}
async function digest(value: string) {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Buffer.from(buffer).toString("hex");
}
