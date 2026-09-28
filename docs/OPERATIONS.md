# Operations & launch notes

## Hosting and source control

- Source: https://github.com/sepidehdalir/saeed-contracting
- Production branch: `main`
- Vercel project: `saeed-contracting`, in `celinadalir-stacks-projects`
- Canonical: https://saeedcontracting.ca
- `www` redirects with HTTP 301 to the apex, preserving the path/query.
- Vercel is linked to the GitHub repository. Pushes to `main` trigger production deployments.
- Pull requests receive Vercel previews. Preview builds emit `X-Robots-Tag: noindex, nofollow`.

## DNS changes required at GoDaddy

Vercel's domain verification returned these exact recommended records on 28 September 2026:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | a1971357b6359ded.vercel-dns-017.com |

Replace the existing parking A records (`3.33.130.190`, `15.197.148.33`) with the two recommended A records. Replace the existing `www` CNAME to the apex with the Vercel CNAME above. Keep existing nameservers, iCloud MX, SPF, DKIM and domain-verification records unchanged. Do not transfer the domain or replace nameservers.

Both names have already been added to the Vercel project. After DNS propagates, use `vercel domains verify saeedcontracting.ca` and `vercel domains verify www.saeedcontracting.ca`. Verify HTTPS and the 301 redirect in a browser. Vercel provisions the certificates when domain configuration is valid.

## Quote requests: launch mode

The production launch uses **email-draft mode**. Visitors complete a validated form, review the generated email, then send it using their email application. The page explicitly says a draft has not been sent. A copy option supports webmail. Call and email links are always available. Photos can be attached in the customer's email application. The website does not upload or store photos.

The connected Resend account rejected creation of `notifications.saeedcontracting.ca` because its plan's domain limit was reached. No unrelated sending domain was reused, existing domain removed, paid plan purchased or iCloud mail record changed.

### Enable direct submissions later

1. Make room on the Resend plan or approve a plan change; then add and verify `notifications.saeedcontracting.ca`. Apply only the exact DNS records Resend supplies for that subdomain. Do not alter the apex iCloud mail records.
2. Create a sending-only Resend API key restricted to that domain. Store it as `RESEND_API_KEY` in Vercel; do not commit it.
3. Create a Cloudflare Turnstile widget for `saeedcontracting.ca`, `www.saeedcontracting.ca` and the production Vercel alias. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
4. Set `QUOTE_FROM_EMAIL` to `Saeed Contracting <quotes@notifications.saeedcontracting.ca>` in Vercel.
5. Redeploy. The UI enables direct sending only when all four values exist. Send an authorised test enquiry and verify arrival in `info@saeedcontracting.ca` and Resend delivery status.

Server protections include bounded streamed body reading (16 KiB), strict field validation, current-service allowlisting, origin allowlisting, a honeypot, a timing check, and mandatory server-side Turnstile verification including hostname/action. Turnstile tokens are single-use. Resend requests use token-derived idempotency keys. The server uses fixed recipient/subject categories, plaintext bodies, and the validated customer's email as reply-to. Provider errors never produce a success message. No form PII or secrets are logged.

Turnstile is the primary distributed anti-bot mechanism; this application does not claim a persistent per-IP rate limiter. Add a Vercel Firewall rate-limit rule for `/api/quote` if traffic or abuse requires it. Delivery is accepted by the provider, not guaranteed to reach the inbox; monitor Resend events and bounces once enabled.

## Content and future services

`src/lib/site.ts` holds business identity. `src/lib/services.ts` is the public service catalogue. The page generator, navigation grid, sitemap and quote dropdown consume only `published` services. Unknown service URLs return HTTP 404.

`futureServiceFlags.electricalServices` is false. There is no public content, navigation item, sitemap entry or quote option for it. When the business is authorised to offer that service, add complete factual content to the catalogue, set its publish flag, update the future flag and tests, and confirm licence/insurance wording separately before release. No redesign is necessary. Do not publish an empty placeholder page.

## SEO and analytics

Every page has its own title/description and canonical URL. Shared metadata includes Open Graph and Twitter cards, local language, business identity and a generated brand social image. JSON-LD uses the real service-area business details without inventing an address, ratings, licences, dates or hours. FAQ markup reflects visible questions. Eligibility for Google rich results is not implied.

The sitemap includes all 15 public pages; robots permits crawling and excludes API endpoints. Set `GOOGLE_SITE_VERIFICATION` if using Search Console's HTML verification method, then submit the sitemap after domain activation. A real Google Business Profile may be linked after the business provides it.

`NEXT_PUBLIC_GA_MEASUREMENT_ID` is reserved but is deliberately not loaded. Add a consent-aware analytics implementation and update the privacy notice before enabling analytics; never add fake IDs. No analytics or advertising scripts run at launch.

## Maintenance

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` and `npm run test:e2e`. End-to-end tests expect email-draft launch mode; update the fixture/environment when testing direct delivery. The unit tests mock external providers and never send messages.

Fonts are self-hosted through `next/font`. Content pages are prerendered; the quote page and API are server-rendered. The hero is a local WebP served through responsive Next Image in AVIF/WebP with fixed layout dimensions. No animation framework or third-party widget loads in email-draft mode.

The Content Security Policy allows inline scripts/styles for Next's prerendered hydration. It disallows framing, object embeds and unknown script origins. A nonce policy would require a deliberate rendering/caching trade-off; do not add `unsafe-eval` to production.
