# Launch verification — 28 September 2026

## Checks

- ESLint, strict TypeScript, two unit/API tests and the production Next.js build passed.
- All 18 end-to-end checks passed locally. On Vercel, 17 passed initially; the combined resize test timed out in Chromium. Using a fresh browser context per viewport resolved the harness timeout, and that check passed against production in 7.7 seconds.
- All 15 public pages passed automated WCAG 2 A/AA and WCAG 2.1 AA axe checks, title/canonical checks, internal link requests, and narrow/wide overflow checks. Automated checks do not replace assistive-technology user testing.
- Seven homepage widths checked: 375, 390, 430, 768, 1024, 1440 and 1920 pixels. Menu open/close, Escape, navigation, FAQ disclosures, and quote service preselection were verified.
- Quote validation, unsent-email review, sitemap, robots, genuine 404s, hidden future services, and the unconfigured API's safe 503 response passed. Delivery unit tests mock Turnstile and Resend; no real enquiry was sent.
- Production hero image returned HTTP 200 and decoded successfully. Screenshots wait for decoding.
- GitHub Actions passed for the performance build `321fbc5c4e7c1e3eafe6b78b79453be5a23ec058`.

## Initial launch limitations (resolved below)

At the initial launch, the custom domain still used parking DNS and the quote form used email drafting. Both blockers are now resolved; see the final activation results below. Turnstile is optional because verified Vercel rate limiting protects production submissions.

No analytics run. Search Console sitemap submission should follow domain activation. No ratings, street address, licence claims or client-project claims were invented. The hero is explicitly identified as an architectural illustration.

## Production Lighthouse

Lighthouse 13.5.0, mobile simulation against `https://saeed-contracting.vercel.app/`, measured performance build `321fbc5`:

| Category       | Score |
| -------------- | ----: |
| Performance    |    97 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

FCP 1.0 seconds; LCP 2.3 seconds; total blocking time 140 ms; cumulative layout shift 0. This is one lab run, not field Core Web Vitals. Lighthouse reported a browser-cache clearing timeout, so cache state may have affected the result. The final homepage title refinement does not change page layout or assets.

## Quote delivery follow-up

The existing 18 browser checks and three new direct-mode browser checks pass. Seven Node test results cover validation, successful two-email submission, Reply-To, branded confirmation, stable retry idempotency, provider failures, challenge rejection and firewall-mode gating. Direct-mode browser tests use dummy credentials and intercept submissions; no live message was sent. A production Vercel firewall probe verified ten invalid requests return 400 and the eleventh returns 429, while the home page remains 200.

These follow-up tests preceded sender activation. The final production test is recorded below.

## Custom domain connected

On 28 September 2026 the owner supplied the correct signed-in GoDaddy account. The two apex A records and www CNAME were applied and verified in GoDaddy, authoritative DNS and public resolvers. Vercel marks both domains correctly configured. An auto-renewing certificate covers both names. Certificate-validated HTTPS against the new Vercel addresses returned 200 for the website and 301 for www, preserving the requested path and query. Existing local DNS caches still showed the old parking result during propagation. iCloud MX, SPF, Apple verification and DKIM were preserved. The domain-capacity blocker was subsequently resolved with the owner’s explicit permission.


## Final production activation

- The normal production URL now returns HTTP 200 over validated HTTPS, without a DNS override. `www` returns HTTP 301 to the apex and preserves path/query.
- `notifications.saeedcontracting.ca` and all four Resend authentication records are verified. Receiving and tracking are disabled. The sending-only API key is restricted to this domain and stored only as a sensitive Vercel production variable.
- One authorized quote was submitted through the actual production form at 2026-09-29 00:09 UTC. The business-controlled inbox served as the test customer; no real customer address was used.
- Vercel recorded `POST /api/quote` HTTP 200 and `quote_delivery_accepted` with exactly two message IDs. The browser showed the success heading without opening an email draft.
- Business notification `01a0ea7e-e61f-72ac-acab-e35e910743cb`: **delivered** to `info@saeedcontracting.ca`; Reply-To matches the submitted customer address; all project fields, UTC timestamp and canonical source verified.
- Customer acknowledgement `01a0ea7e-e621-76ca-9cf9-d612a71b8070`: **delivered**, correct branding, phone/email and practical response wording. Delivery is the recipient server's acceptance, not a read receipt.
- All 15 public pages passed live canonical/SEO, axe accessibility, internal links and responsive checks on the custom domain. Seven screen widths and mobile navigation also passed: 16 live checks in total. A direct-mode quote-page check followed activation.
- Vercel error-level logs for the tested production deployment contained no errors during the activation window. The successful quote request logged only opaque identifiers.
- iCloud MX, apex SPF, Apple verification and iCloud DKIM remain intact. No manual DNS or sender activation step remains.
- Lint, strict types, production build, seven unit/API test results, 18 original browser checks and three direct-mode browser checks passed for the unchanged application code. Automated provider tests sent no email.
