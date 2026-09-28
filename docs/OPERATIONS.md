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

## Quote requests: current production state

The site remains in **email-draft mode** until a verified sender and restricted Resend key are available. Visitors prepare and send an email themselves; the page never claims a draft was submitted. The direct workflow now includes both the business notification and the branded customer confirmation.

On 28 September 2026, a fresh attempt to create `notifications.saeedcontracting.ca` was rejected: **3 of 3 Resend domain slots are used**. No DNS records were issued, so there are no genuine Resend verification records to publish yet. No unrelated domain was deleted or reused, no paid upgrade was purchased and no iCloud records were changed.

### Finish sender activation

1. Add Resend domain capacity, or explicitly authorize removal of an unused existing domain. Create `notifications.saeedcontracting.ca` with sending enabled, receiving disabled, and tracking disabled.
2. Retrieve that domain's actual DNS records. Add its DKIM TXT plus its Return-Path MX/SPF under the sending subdomain. Use only the exact hostnames/values returned by Resend. Never replace apex iCloud MX/SPF/DKIM, and never create a second SPF record at the same hostname.
3. Verify the sending domain. Create a `sending_access` API key restricted to that domain, then save it only as Vercel's sensitive production `RESEND_API_KEY`. Do not put credentials in a command literal, repository, documentation or chat output.
4. `QUOTE_FROM_EMAIL` is set in production to `Saeed Contracting <quotes@notifications.saeedcontracting.ca>`. `QUOTE_FIREWALL_ENABLED=true` is also set after the firewall was published and tested. Redeploy after adding the key. No Turnstile credential is required in this verified firewall mode.
5. Submit **one** clearly labelled live test quote. Use a mailbox controlled by the business for the test customer address. Confirm both email IDs in Resend, their delivered events, Reply-To, fixed business recipient and Vercel runtime logs. API acceptance alone is not proof of inbox delivery. No live email was sent while configuration was blocked.

### Delivery behavior and safeguards

The API submits a two-message Resend batch: a plaintext notification to `info@saeedcontracting.ca` with the customer's Reply-To, followed by a branded HTML/plaintext acknowledgement to the validated customer address. The notification includes all form fields, UTC submission timestamp and canonical website source. The confirmation contains only fixed business content, preventing use as an arbitrary-content relay. It promises no exact response time. Photos remain email attachments sent separately; there is no upload endpoint.

A client-generated UUID and submission timestamp remain stable on retries of unchanged details. The server hashes the UUID into the Resend batch idempotency key. Resend retains keys for 24 hours; this endpoint rejects submissions older than 23 hours. Identical retries reuse the same batch; changed content with the same key is rejected. A synchronous client lock prevents concurrent clicks. Refreshing the page starts a new enquiry; this is not a permanent customer-deduplication system.

Server-side validation, an allowlist of published services, strict single-address email syntax, origin allowlisting, a 16 KiB streamed body limit, honeypot and timing checks remain enabled. The UI requires both sender configuration and configured protection before offering direct submission. Outside Vercel, firewall mode cannot enable delivery. If both Turnstile keys are added, hostname/action validation also runs. An in-memory counter is not used as a substitute for distributed protection.

The **live Vercel rule** `Quote submission rate limit` (`rule_quote_submission_rate_limit_1A9HNr`) matches only `POST /api/quote`. It allows **10 requests per IP per 600 seconds**, fixed window, then returns HTTP 429. Vercel counts per region, not globally. Published configuration and an eleven-invalid-request probe verified ten HTTP 400 responses followed by HTTP 429; normal homepage access remained HTTP 200. This probe sent no emails. If this rule is disabled, first set `QUOTE_FIREWALL_ENABLED=false` and redeploy unless Turnstile is configured.

Only a valid two-ID provider acceptance yields success. Failures preserve customer details with retry, call and email alternatives; provider details never appear in customer messages. Logs contain event names, opaque submission hashes, provider status codes and email IDs, never API keys or customer form contents. Monitor Resend delivery/bounce events after activation. API acceptance does not guarantee arrival in the inbox.

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
