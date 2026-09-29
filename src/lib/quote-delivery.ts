import { quoteText, type Quote } from "./quote";
import { site } from "./site";

// Only configured, verified infrastructure may enable direct delivery.
export function quoteDeliveryConfig() {
  const turnstile = !!(
    process.env.TURNSTILE_SECRET_KEY &&
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  );
  const firewall =
    process.env.VERCEL === "1" && process.env.QUOTE_FIREWALL_ENABLED === "true";
  return {
    direct: !!(
      process.env.RESEND_API_KEY &&
      process.env.QUOTE_FROM_EMAIL &&
      (turnstile || firewall)
    ),
    turnstile,
  };
}

export function quoteEmails(
  q: Quote,
  service: string,
  submittedAt: number,
  from: string,
) {
  const recipient =
    process.env.QUOTE_TO_EMAIL?.trim() || "celinadalir@gmail.com";
  const confirmation = `Thank you for contacting Saeed Contracting.\n\nWe received your project request. Our team will review the details and respond as soon as practical.\n\nCall: 604-627-0166\nEmail: ${recipient}\nWebsite: https://saeedcontracting.ca\n\nThis confirms receipt of your enquiry, not a booking. If you did not submit this request, you can ignore this email.`;
  return [
    {
      from,
      to: [recipient],
      reply_to: q.email,
      subject: `New Quote Request — ${service} — ${q.name}`,
      text: `${quoteText(q, service)}\n\nSubmitted at (UTC): ${new Date(submittedAt).toISOString()}\nWebsite source: ${site.url}/request-a-quote`,
    },
    {
      from,
      to: [q.email],
      reply_to: recipient,
      subject: "We received your request — Saeed Contracting",
      text: confirmation,
      // No customer-controlled content or links appear in the confirmation.
      html: `<!doctype html><html lang="en"><body style="margin:0;background:#f3f5f5;color:#102635;font-family:Arial,sans-serif"><table role="presentation" style="width:100%;max-width:600px;margin:32px auto;background:white;border-collapse:collapse"><tr><td style="padding:32px;background:#0b1d2a;color:#e2e8eb;font-family:Georgia,serif;font-size:25px">SAEED <span style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:3px">CONTRACTING</span></td></tr><tr><td style="padding:32px;line-height:1.7"><h1 style="font-size:24px;font-family:Georgia,serif">Thank you for getting in touch.</h1><p>We received your project request. Our team will review the details and respond as soon as practical.</p><p><a href="tel:+16046270166" style="color:#102635">604-627-0166</a><br><a href="mailto:${recipient}" style="color:#102635">${recipient}</a></p><p><a href="https://saeedcontracting.ca" style="color:#102635">Saeed Contracting</a> · North Vancouver &amp; Greater Vancouver</p><p style="font-size:12px;color:#53616a">This confirms receipt of your enquiry, not a booking. If you did not submit this request, you can ignore this email.</p></td></tr></table></body></html>`,
    },
  ];
}
