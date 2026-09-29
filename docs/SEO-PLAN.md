# Saeed Contracting — technical local SEO audit and 90-day plan

Audit date: 28 September 2026. Planning period: 29 September–27 December 2026 (90 days).

## Scope and evidence

Production was crawled before changes: all 15 sitemap pages returned HTTP 200. Each had one H1, unique title/description, canonical and Open Graph URL. Service pages contained approximately 333–390 words in the main content, including FAQs and calls to action. Robots allowed public pages and excluded `/api/`. Existing sitemap and HTTPS were already functioning; this was an improvement of the existing foundation, not a rebuild.

Before-crawl evidence is saved in `seo-before.json`. This audit does not claim access to private Search Console data, current Google rankings, search volume or the owner's Google Business Profile. Keyword priorities below are qualitative intent-based recommendations, not measured rankings or volume estimates. No Search Console verification or GBP posting has been performed.

## Before / after implementation checklist

| Area | Before | After |
| --- | --- | --- |
| HTTPS / preferred domain | Canonical apex with HTTPS and www redirect already working | Preserved; no registrar or DNS changes |
| robots.txt | Public crawl allowed; API excluded | Preserved; template URLs remain crawlable so noindex can be read |
| sitemap.xml | 15 public URLs | 16 indexable URLs including Projects hub; six blank template pages intentionally excluded |
| Canonical URLs | Correct production canonicals | Retained on all existing pages; self-canonicals on hub and template pages |
| Home title / relevance | North Vancouver Contractor; brand-led H1 | Handyman Services in North Vancouver; natural handyman and home-repair copy |
| Service metadata | Unique but generic service titles/intros | Intent-specific titles/descriptions; specific headings including North Vancouver |
| Open Graph / Twitter | Existing brand image and metadata | Preserved and aligned with the revised page metadata |
| Business schema | GeneralContractor; Greater Vancouver typed as City | HomeAndConstructionBusiness (a LocalBusiness subtype); accurate regional type; catalogue of all eight real services |
| Contact facts | Public phone 604-627-0166 and public email info@saeedcontracting.ca; quote notifications use Gmail | Single source for visible contact and schema; private quote routing remains Gmail; public email awaiting owner preference |
| Service schema | Service nodes on eight genuine service pages | Preserved with the shared business ID and corrected service-area types; no invented offers/prices |
| Service copy | Existing scope, preparation and two FAQs | Two additional unique planning sections and a third visible FAQ per service; homeowners, strata and small-business considerations tailored to the work |
| FAQs | Visible, schema-backed home/contact/service FAQs | Service FAQs expanded; automated checks compare every schema answer with visible page text |
| Internal links | Service-to-service, area and quote links | Contextual service-to-contact and Projects links; area-to-every-service links; contact-to-services/areas; home/footer-to-Projects |
| Projects | No section | Public Projects hub plus six reusable blank story templates, with repeated clear labels; no fabricated client work |
| Indexing of placeholders | Not applicable | Template pages use noindex, follow and stay out of sitemap; no Article dates, reviews or project-result claims |
| Claims | No public electrical offering, invented licence or ratings | Preserved; no duplicate city pages, fake reviews, guarantees, fabricated prices, locations or availability |
| Performance / usability | Server-rendered content, local assets, responsive design | Same architecture; static content/templates, no new client library, tracker or blocking widget |

## Public business identity and open item

Website: https://saeedcontracting.ca. Phone: 604-627-0166; machine-readable telephone: +16046270166. Primary area: North Vancouver. Other existing service areas: West Vancouver, Vancouver, Burnaby, Coquitlam and Greater Vancouver, subject to scope and scheduling.

The existing public email is `info@saeedcontracting.ca`, but the owner previously said its inbox does not work. The actual quote recipient is `celinadalir@gmail.com`. I asked whether Gmail should become public; pending an answer, I retained the established public email instead of publishing a personal address as a new public contact without confirmation. This is the remaining contact-consistency decision. Calls and the verified direct quote form remain working conversion routes. Once approved, update visible contact, metadata, schema and fallback mail links together from a shared value.

No street address, exact coordinates, operating hours, licences, insurance or review ratings were invented. The broader HomeAndConstructionBusiness type accurately describes the current work without claiming specialist credentials. Google lists an address among LocalBusiness rich-result requirements; this service-area site therefore does not claim rich-result eligibility. Keep a residential address private rather than manufacturing a storefront. [Google LocalBusiness documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) · [Schema.org type](https://schema.org/HomeAndConstructionBusiness)

Visible FAQs and matching FAQPage schema are retained at the owner's request. Google retired FAQ rich results in May 2026; this markup is not a promise of expanded Google listings. [Google's current documentation updates](https://developers.google.com/search/updates)

## Exact Google Search Console setup

1. Sign in to [Google Search Console](https://search.google.com/search-console) using the Google account that should own the business property.
2. Open the property selector → **Add property** → **Domain**. Enter exactly `saeedcontracting.ca`, without https, www or a path. This covers domain variants in one property. [Google property setup](https://support.google.com/webmasters/answer/34592?hl=en)
3. Choose DNS TXT verification and copy the exact `google-site-verification=...` value Google gives you. It is account-specific; no token is invented in this plan.
4. In GoDaddy, open the domain → DNS → Add New Record: **Type TXT; Name @; Value the exact Google token; TTL 1 hour (or GoDaddy default)**. Add a separate verification TXT record; do not edit the iCloud SPF, MX, Apple verification, Resend records, or Vercel records.
5. Return to Search Console and click **Verify**. If pending, allow DNS propagation and retry. Keep the verification record after success. [Google ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en)
6. Select the verified property → **Sitemaps**. Submit exactly `https://saeedcontracting.ca/sitemap.xml`. Open its status after processing and confirm **Success**. A submission is a discovery aid, not an indexing guarantee. [Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en)
7. Use **URL inspection** on the homepage, `/services/general-repairs`, `/services/property-maintenance`, `/services/tv-mounting-installations` and `/projects`. Test the live URL. Confirm a successful fetch, indexing allowed, and the user-declared canonical on the apex. Request indexing for those key pages after verification. Google-selected canonicals appear after processing; they cannot be confirmed from this deployment alone.
8. Do not request indexing for `/projects/templates/*`: those are intentional noindex pages. Check Page indexing for unexpected exclusions, redirects, crawl failures or canonical disagreements. Save the initial report as the baseline.
9. Review Performance → Search results at days 30, 60 and 90, using Canada and page/query filters. Record impressions, clicks, CTR and average position by target page. Compare equal periods; low-volume early data is not a reliable basis for aggressive rewrites.

Optional URL-prefix property: `https://saeedcontracting.ca/`. If choosing HTML-tag verification instead of DNS, store only the token from Google's meta tag in Vercel `GOOGLE_SITE_VERIFICATION`, redeploy, then verify. The existing code emits that tag only when configured. DNS Domain verification is the preferred setup here; it needs no code deployment.

## Top 15 target keywords and page ownership

One primary page owns each service intent. Similar phrases map to the same substantive page; do not create separate near-duplicate city or keyword pages. Deck and fence repair share an existing page with distinct sections until there is enough real work/content to justify a split.

| Priority | Keyword | Intent | Page to rank |
| --- | --- | --- | --- |
| 1 | handyman North Vancouver | Hire a local handyman | [/](https://saeedcontracting.ca/) |
| 2 | handyman services North Vancouver | Compare local help and request a quote | [/](https://saeedcontracting.ca/) |
| 3 | home repairs North Vancouver | Book repairs | [/services/general-repairs](https://saeedcontracting.ca/services/general-repairs) |
| 4 | small home repairs North Vancouver | Combine small repair tasks | [/services/general-repairs](https://saeedcontracting.ca/services/general-repairs) |
| 5 | home maintenance North Vancouver | Arrange upkeep or a task list | [/services/home-maintenance](https://saeedcontracting.ca/services/home-maintenance) |
| 6 | property maintenance North Vancouver | Find a property maintenance provider | [/services/property-maintenance](https://saeedcontracting.ca/services/property-maintenance) |
| 7 | strata maintenance North Vancouver | Arrange approved common-area work | [/services/property-maintenance](https://saeedcontracting.ca/services/property-maintenance) |
| 8 | rental property maintenance North Vancouver | Plan turnover repairs | [/services/property-maintenance](https://saeedcontracting.ca/services/property-maintenance) |
| 9 | TV mounting North Vancouver | Book a mounting job | [/services/tv-mounting-installations](https://saeedcontracting.ca/services/tv-mounting-installations) |
| 10 | TV installation North Vancouver | Find mounting and setup help within stated scope | [/services/tv-mounting-installations](https://saeedcontracting.ca/services/tv-mounting-installations) |
| 11 | furniture assembly North Vancouver | Book furniture assembly | [/services/furniture-assembly](https://saeedcontracting.ca/services/furniture-assembly) |
| 12 | flat pack furniture assembly North Vancouver | Arrange assembly for specific products | [/services/furniture-assembly](https://saeedcontracting.ca/services/furniture-assembly) |
| 13 | interior painting North Vancouver | Request a room or trim painting quote | [/services/painting-finishing](https://saeedcontracting.ca/services/painting-finishing) |
| 14 | deck repair North Vancouver | Assess an existing deck repair | [/services/deck-fence-repairs](https://saeedcontracting.ca/services/deck-fence-repairs) |
| 15 | fence repair North Vancouver | Repair a fence section or gate | [/services/deck-fence-repairs](https://saeedcontracting.ca/services/deck-fence-repairs) |

## Projects: six reusable templates

The Projects hub is at `/projects`. These published templates are writing frameworks, not examples of completed work:

1. `/projects/templates/home-repair`
2. `/projects/templates/property-maintenance`
3. `/projects/templates/tv-mounting`
4. `/projects/templates/furniture-assembly`
5. `/projects/templates/painting`
6. `/projects/templates/deck-fence-repair`

For a genuine case study, collect the client's permission, approved location granularity, dates, actual scope, materials, comparable before/after photos and a factual outcome. Store private client details separately. Publish a separate descriptive project URL only when these facts exist; link it to its service and quote page and add that finished URL to the sitemap. Keep the reusable template noindex. Do not use stock or generated photos as evidence of completed work, and do not add Review schema to a project story.

## 90-day content and Google Business Profile calendar

Cadence: one substantive website improvement and two GBP Update posts per week, for 13 weeks. This is a proposed calendar, not scheduled publishing. Text below is a draft brief/caption to review against real availability before posting. Use actual work photos only with permission. If unavailable, use a branded checklist graphic clearly presented as guidance, not a before/after result. No offer, discount, review or response-time promise is assumed.

GBP groundwork in week 1: claim or access the real business profile, complete verification, use the real business name without keywords added, select the closest available category matching current work, and keep one service-area profile. If customers are not received at the business address, hide it. Confirm actual phone, website, service coverage and hours. Do not create extra city profiles or a virtual office. [Google service-area guidelines](https://support.google.com/business/answer/3038177?hl=en)

Use **Update** posts with a **Learn more** button to the relevant service page or a supported quote CTA. Phone contact belongs in the verified profile/Call button, not repeated in each caption. Use tagged landing links, for example `https://saeedcontracting.ca/services/general-repairs?utm_source=google&utm_medium=organic&utm_campaign=gbp_90day&utm_content=w01_repairs`. Canonicals stay clean. [Google post guidance](https://support.google.com/business/answer/7342169?hl=en)

| Week / dates | Website content or action | GBP post A (Tuesday) | GBP post B (Friday) | Asset / evidence |
| --- | --- | --- | --- | --- |
| 1: 2026-09-29 / 2026-10-02 — Foundation and repair lists | Complete Search Console and GBP verification; record the baseline. Review the general-repairs page against actual scope. | A sticking door, loose cabinet hinge or damaged trim? Send the full repair list and photos so the scope can be reviewed together. [Landing page](https://saeedcontracting.ca/services/general-repairs) | Planning work in North Vancouver? Include the neighbourhood, property type and access details when requesting a quote. [Landing page](https://saeedcontracting.ca/service-areas) | Branded repair-list checklist; actual exterior only with permission |
| 2: 2026-10-06 / 2026-10-09 — TV mounting preparation | Expand the mounting page only if real enquiries reveal a missing question; add a bracket/photo checklist. | Before booking TV mounting, gather the TV model, bracket model and a photo of the wall. A clear starting point helps us assess the installation. [Landing page](https://saeedcontracting.ca/services/tv-mounting-installations) | For condo mounting, confirm building permissions before drilling. Include wall material and existing outlet locations in your request. [Landing page](https://saeedcontracting.ca/services/tv-mounting-installations) | Bracket checklist graphic; no invented installation photograph |
| 3: 2026-10-13 / 2026-10-16 — Furniture assembly | Create an owner-reviewed product-information checklist on the assembly page. | Several flat-pack items arriving? Send product links, quantities and delivery dates so the assembly scope can be planned. [Landing page](https://saeedcontracting.ca/services/furniture-assembly) | Beds, desks and storage need room to assemble. Clear the work area and keep the instructions and hardware together. [Landing page](https://saeedcontracting.ca/services/furniture-assembly) | Actual boxed product/assembly photo with consent, or checklist |
| 4: 2026-10-20 / 2026-10-23 — Seasonal home upkeep | Add a concise accessible-weatherstripping checklist; review first-month indexing and query data. | Small maintenance jobs are easier to discuss as a list. Note worn weatherstripping, loose fittings and gaps you have noticed. [Landing page](https://saeedcontracting.ca/services/home-maintenance) | A maintenance visit covers agreed tasks. Tell us about recurring issues so we can discuss whether a closer assessment is needed. [Landing page](https://saeedcontracting.ca/services/home-maintenance) | Door-seal diagram labelled as guidance |
| 5: 2026-10-27 / 2026-10-30 — Painting scope | Add a surface-by-surface painting request checklist, not a speculative price guide. | Planning a room refresh? List walls, ceilings, doors and trim separately, and share photos of the existing finish. [Landing page](https://saeedcontracting.ca/services/painting-finishing) | A paint label or sample can help with matching. Age and sheen may make isolated touch-ups visible; discuss the finish before starting. [Landing page](https://saeedcontracting.ca/services/painting-finishing) | Actual paint label with identifying details removed; palette graphic |
| 6: 2026-11-03 / 2026-11-06 — Deck repairs | Prepare a real deck-repair story with the template only if evidence and permission exist; otherwise refine the repair FAQ. | For a deck repair enquiry, photograph the affected boards and accessible surrounding areas. Mention any movement or softness you have noticed. [Landing page](https://saeedcontracting.ca/services/deck-fence-repairs) | A local board repair and a larger structural problem need different planning. Share the condition so the appropriate scope can be discussed. [Landing page](https://saeedcontracting.ca/services/deck-fence-repairs) | Genuine damage photograph with consent, or repair-scope graphic |
| 7: 2026-11-10 / 2026-11-13 — Fence and gate repairs | Develop the fence/gate section from actual customer questions; keep it on the combined repair page. | A gate that drags may need more than a new latch. Photos of hinges, posts and the surrounding area help explain the issue. [Landing page](https://saeedcontracting.ca/services/deck-fence-repairs) | Before work on a shared fence, confirm who can authorize the repair. Include access and boundary responsibilities with the enquiry. [Landing page](https://saeedcontracting.ca/services/deck-fence-repairs) | Gate-detail photo or labelled parts illustration |
| 8: 2026-11-17 / 2026-11-20 — Strata maintenance | Add a downloadable/internal work-list checklist if useful; review days 30–60 Search Console trends. | Strata maintenance starts with an approved list. Identify common-area tasks, the authorized contact and permitted work hours. [Landing page](https://saeedcontracting.ca/services/property-maintenance) | Coordinating several repairs? Send the locations, priorities and access rules so a practical maintenance scope can be reviewed. [Landing page](https://saeedcontracting.ca/services/property-maintenance) | Blank approved-task checklist, never client documents |
| 9: 2026-11-24 / 2026-11-27 — Rental turnover | Use the property template for a verified rental project, or add a factual turnover planning section instead. | For a rental turnover, include the access window, repair list and surfaces needing attention. Scope and timing are confirmed before booking. [Landing page](https://saeedcontracting.ca/services/property-maintenance) | Touch-ups and hardware repairs often share the same access window. Include all priorities rather than sending one item at a time. [Landing page](https://saeedcontracting.ca/services/general-repairs) | Empty-room photo only with permission; planning graphic |
| 10: 2026-12-01 / 2026-12-04 — Small-business upkeep | Review commercial-use wording with actual scope; add an occupied-workspace access FAQ if needed. | For a small workplace repair, tell us which areas must remain accessible and which hours suit the property. [Landing page](https://saeedcontracting.ca/services/property-maintenance) | New desks or storage for a workplace? Share models, quantities and the intended room layout before arranging assembly. [Landing page](https://saeedcontracting.ca/services/furniture-assembly) | Branded workspace-planning checklist |
| 11: 2026-12-08 / 2026-12-11 — Documented workmanship | Publish one genuine case study if approved facts exist; otherwise keep the templates and publish a planning FAQ. | A useful project record explains the starting condition, agreed scope and work completed. Our blank templates show what to document. [Landing page](https://saeedcontracting.ca/projects) | Before requesting a repair quote, take a close-up and a wider view. Please keep access codes and private documents out of photographs. [Landing page](https://saeedcontracting.ca/request-a-quote) | Template preview explicitly labelled “Template”; real result only if approved |
| 12: 2026-12-15 / 2026-12-18 — Combined job lists | Add an answered customer question to the relevant existing page; review internal links from any real story. | Have more than one job in mind? Send the complete list, from small repairs to assembly, so we can discuss a coordinated scope. [Landing page](https://saeedcontracting.ca/services/general-repairs) | Not sure which category fits? Choose Other / Something else on the quote form and briefly describe the service you need. [Landing page](https://saeedcontracting.ca/request-a-quote) | Real quote-form screenshot without personal information |
| 13: 2026-12-22 / 2026-12-25 — Review and next-quarter planning | Day 90: compare matched periods, update the keyword map from real queries, fix indexing issues and plan the next evidence-led case study. | Planning next-quarter upkeep? Organize tasks by location and priority, then send your list for review. [Landing page](https://saeedcontracting.ca/services/home-maintenance) | Start your next project with the details: service, property location, access and preferred timing. Availability is confirmed directly. [Landing page](https://saeedcontracting.ca/request-a-quote) | Branded planning checklist; verify seasonal hours before publishing |

## Measurement and maintenance

Every week: check new quote enquiries, delivery failures, broken pages and Business Profile messages/reviews. Respond to genuine reviews without offering incentives or selectively asking only satisfied clients. Review the real profile details whenever hours or scope change. Do not treat posting frequency as a guaranteed ranking signal.

Days 1–30: establish verified properties and a baseline; resolve crawl/indexing errors; review which service pages receive impressions. Days 31–60: improve the page matching an actual high-intent query; publish a genuine project story only with evidence. Days 61–90: compare equal periods, assess enquiry quality and expand useful content where a real gap exists.

Track qualified enquiries by service and source, not only traffic. A simple private spreadsheet can record date, requested service, source when volunteered, response and outcome. Do not put customer details into URLs, analytics events or public project stories. GA remains disabled until a suitable consent-aware implementation is chosen. GBP and Search Console provide their own reporting; UTM links alone do not create on-site analytics.

Google says local results are mainly determined by relevance, distance and prominence. This technical foundation improves clarity and discoverability but cannot guarantee positions or overcome distance for every searcher. [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en)
