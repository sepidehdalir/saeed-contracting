# Operations & launch notes

## Hosting and source control

- Source: https://github.com/sepidehdalir/saeed-contracting
- Production branch: `main`
- Vercel project: `saeed-contracting`, in `celinadalir-stacks-projects`
- Canonical: https://saeedcontracting.ca
- `www` is configured in Vercel to redirect with HTTP 301 to the apex. The application also preserves the path/query in its 301 rule. HTTPS and the 301 redirect have been verified directly against the configured Vercel edge; older resolver caches may briefly retain the parking result.
- Vercel is linked to the GitHub repository. Pushes to `main` trigger production deployments.
- Pull requests receive Vercel previews. Preview builds emit `X-Robots-Tag: noindex, nofollow`.

## Production DNS at GoDaddy

The website DNS changes were applied through the owner's signed-in GoDaddy account on 28 September 2026. Both authoritative GoDaddy nameservers now return Vercel's records, and Vercel reports both hostnames configured correctly.

| Type  | Name | Value                               | TTL         |
| ----- | ---- | ----------------------------------- | ----------- |
| A     | @    | 216.198.79.1                        | 600 seconds |
| A     | @    | 64.29.17.1                          | 600 seconds |
| CNAME | www  | a1971357b6359ded.vercel-dns-017.com | 1 hour      |

The Parked A record was replaced and the second Vercel A address added. The www CNAME was changed from the apex to Vercel's recommended target. Registrar and nameservers remain GoDaddy (`ns39.domaincontrol.com`, `ns40.domaincontrol.com`). No nameserver transfer is needed.

Mail DNS was preserved and rechecked: both priority-10 iCloud MX records, the single `v=spf1 include:icloud.com ~all` TXT, Apple verification TXT, and `sig1._domainkey` CNAME to `sig1.dkim.saeedcontracting.ca.at.icloudmailadmin.com`. No email record was edited.

The auto-renewing certificate `cert_WVWfZJoAlloY20FwrXPBhkPR` covers both names. A certificate-validated HTTPS request to the configured Vercel IP returned HTTP 200, and `https://www.saeedcontracting.ca/services?check=domain` returned HTTP 301 to `https://saeedcontracting.ca/services?check=domain`. Cloudflare and Google public DNS returned the new records. Local cached resolution still briefly returned parking at the time of verification; no certificate validation was disabled. No additional website DNS action is needed.

## Quote recipient correction

The owner reported that `info@saeedcontracting.ca` has no working inbox. Production business notifications now use `QUOTE_TO_EMAIL=celinadalir@gmail.com` as their sole recipient, with no CC/BCC. The customer email remains the notification Reply-To. Customer acknowledgements still go to the customer, with replies and email contact directed to the configured business recipient. The verified `notifications.saeedcontracting.ca` sender remains unchanged; Resend Receiving remains disabled. Earlier delivery records below are historical provider acceptance, not proof of a usable mailbox.

## Quote requests: current production state

The production form sends directly through Resend. One live test through the actual form returned HTTP 200 and showed the on-page success message. Both the business notification and branded customer confirmation received Resend **delivered** events. Email drafting remains a graceful fallback when configuration is unavailable.

On 28 September 2026, the owner authorized removal of the unused, unverified `petsclub.ca` Resend entry to free a domain slot. The sending domain `notifications.saeedcontracting.ca` was created with receiving and tracking disabled. Its four exact records were added through GoDaddy; existing iCloud mail records were preserved.

### Sending-domain DNS

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| TXT | resend._domainkey.notifications | See public DKIM value below | 1 hour |
| MX | send.notifications | feedback-smtp.us-east-1.amazonses.com (priority 10) | 1 hour |
| TXT | send.notifications | v=spf1 include:amazonses.com ~all | 1 hour |
| CNAME | rsend.notifications | send.forge.rmta.net | 1 hour |

Public DKIM TXT value (not a secret):

```text
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4sQCdj8+ShNrifAkZW6ys5n59QCuMJ7l3kRUgoMi/CPzqAL6u4rwAa/xR2WUI++G1GO1CnPaC0kgOZaqyqcu1kgABmRP906OgVoiMcUNOeozMI9ZGGqo7IxEcSUWUAABx1t6JINZ6Z8blSanHZXZ9FXgp/4QWqMXm0+awS9Vu7QIDAQAB
```

The subdomain SPF is separate from the unchanged apex iCloud SPF. There is one SPF policy per hostname. No receiving MX was added at the apex.

### Verified production delivery

Resend has verified the domain and all four DNS records. A `sending_access` key restricted to this domain is stored only as Vercel's sensitive production `RESEND_API_KEY`. Production was redeployed with that configuration. Production already has `QUOTE_FROM_EMAIL=Saeed Contracting <quotes@notifications.saeedcontracting.ca>` and `QUOTE_FIREWALL_ENABLED=true`. No Turnstile credential is required with the verified Vercel firewall rule.

The one authorized test was submitted on 28 September 2026 at 17:09 Vancouver time (29 September 00:09 UTC), using the business-controlled `info@saeedcontracting.ca` address as the test customer. Both messages were delivered to that inbox; no further test quotes were sent. The business notification had the submitted customer email as Reply-To and contained every required field, submission timestamp and canonical source.

- Business message ID: `01a0ea7e-e61f-72ac-acab-e35e910743cb` — delivered.
- Customer confirmation ID: `01a0ea7e-e621-76ca-9cf9-d612a71b8070` — delivered.
- Vercel request ID: `vdnjt-1790640579786-c91b387e22a0` — `POST /api/quote`, HTTP 200, safe `quote_delivery_accepted` log.
- Tested deployment: `dpl_3825biriUNDprf8KNbpLRumduro8`.

Resend delivery confirms acceptance by the recipient mail server, not whether someone read the message or its inbox folder. No manual DNS or email activation step remains.

### Delivery behavior and safeguards

The API submits a two-message Resend batch: a plaintext notification to the single configured `QUOTE_TO_EMAIL` recipient with the customer's Reply-To, followed by a branded HTML/plaintext acknowledgement to the validated customer address. The notification includes all form fields, UTC submission timestamp and canonical website source. The confirmation contains only fixed business content, preventing use as an arbitrary-content relay. It promises no exact response time. Photos remain email attachments sent separately; there is no upload endpoint.

A client-generated UUID and submission timestamp remain stable on retries of unchanged details. The server hashes the UUID into the Resend batch idempotency key. Resend retains keys for 24 hours; this endpoint rejects submissions older than 23 hours. Identical retries reuse the same batch; changed content with the same key is rejected. A synchronous client lock prevents concurrent clicks. Refreshing the page starts a new enquiry; this is not a permanent customer-deduplication system.

Server-side validation, an allowlist of published services, strict single-address email syntax, origin allowlisting, a 16 KiB streamed body limit, honeypot and timing checks remain enabled. The UI requires both sender configuration and configured protection before offering direct submission. Outside Vercel, firewall mode cannot enable delivery. If both Turnstile keys are added, hostname/action validation also runs. An in-memory counter is not used as a substitute for distributed protection.

The **live Vercel rule** `Quote submission rate limit` (`rule_quote_submission_rate_limit_1A9HNr`) matches only `POST /api/quote`. It allows **10 requests per IP per 600 seconds**, fixed window, then returns HTTP 429. Vercel counts per region, not globally. Published configuration and an eleven-invalid-request probe verified ten HTTP 400 responses followed by HTTP 429; normal homepage access remained HTTP 200. This probe sent no emails. If this rule is disabled, first set `QUOTE_FIREWALL_ENABLED=false` and redeploy unless Turnstile is configured.

Only a valid two-ID provider acceptance yields success. Failures preserve customer details with retry, call and email alternatives; provider details never appear in customer messages. Logs contain event names, opaque submission hashes, provider status codes and email IDs, never API keys or customer form contents. Monitor Resend delivery/bounce events during operation. API acceptance does not guarantee arrival in the inbox.

### Verification

Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e` and `npm run test:delivery`. The existing site suite covers draft mode; the separate delivery suite starts a local production server with dummy credentials, intercepts browser submissions and checks success, retry, duplicate-click protection, invalid data, mobile width and absence of the dummy secret in page/JavaScript responses. Unit tests exercise the real route using mocked provider responses for both messages, stable idempotency, Reply-To, provider failure, validation, anti-spam and safe logging. None of these automated suites sends real email.

## Content and future services

`src/lib/site.ts` holds business identity. `src/lib/services.ts` is the public service catalogue. The page generator, navigation grid, sitemap and quote dropdown consume only `published` services. Unknown service URLs return HTTP 404.

`futureServiceFlags.electricalServices` is false. There is no public content, navigation item, sitemap entry or quote option for it. When the business is authorised to offer that service, add complete factual content to the catalogue, set its publish flag, update the future flag and tests, and confirm licence/insurance wording separately before release. No redesign is necessary. Do not publish an empty placeholder page.

## SEO and analytics

Every page has its own title/description and canonical URL. Shared metadata includes Open Graph and Twitter cards, local language, business identity and a generated brand social image. JSON-LD uses the real service-area business details without inventing an address, ratings, licences, dates or hours. FAQ markup reflects visible questions. Eligibility for Google rich results is not implied.

The sitemap includes all 15 public pages; robots permits crawling and excludes API endpoints. Set `GOOGLE_SITE_VERIFICATION` if using Search Console's HTML verification method, then submit the sitemap after domain activation. A real Google Business Profile may be linked after the business provides it.

`NEXT_PUBLIC_GA_MEASUREMENT_ID` is reserved but is deliberately not loaded. Add a consent-aware analytics implementation and update the privacy notice before enabling analytics; never add fake IDs. No analytics or advertising scripts run at launch.

## Maintenance

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` and `npm run test:e2e`. The main browser suite expects draft mode; the separate delivery suite tests direct mode without sending email. The unit tests mock external providers and never send messages.

Fonts are self-hosted through `next/font`. Content pages are prerendered; the quote page and API are server-rendered. The hero is a local WebP served through responsive Next Image in AVIF/WebP with fixed layout dimensions. No animation framework or third-party widget loads in email-draft mode.

The Content Security Policy allows inline scripts/styles for Next's prerendered hydration. It disallows framing, object embeds and unknown script origins. A nonce policy would require a deliberate rendering/caching trade-off; do not add `unsafe-eval` to production.
