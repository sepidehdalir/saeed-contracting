import { Suspense } from "react";
import { PageIntro } from "@/components/shared";
import { QuoteForm } from "@/components/quote-form";
import { services } from "@/lib/services";
import { metadata as makeMetadata } from "@/lib/site";
export const metadata = makeMetadata(
  "Request a Quote — Repairs & Property Services",
  "Tell Saeed Contracting about your project in North Vancouver or Greater Vancouver. Request a quote for repairs, maintenance, painting or installations.",
  "/request-a-quote",
);
async function Form({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const requested = (await searchParams).service;
  const selected = services.some((s) => s.slug === requested) ? requested! : "";
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
  const direct = !!(
    process.env.RESEND_API_KEY &&
    process.env.QUOTE_FROM_EMAIL &&
    process.env.TURNSTILE_SECRET_KEY &&
    key
  );
  return (
    <QuoteForm
      options={services.map(({ slug, name }) => ({ slug, name }))}
      initialService={selected}
      direct={direct}
      siteKey={key}
    />
  );
}
export default function Quote({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  return (
    <>
      <PageIntro
        eyebrow="YOUR NEXT PROJECT"
        title="Let’s get the details right."
        description="Tell us what your property needs. We’ll review the scope and discuss the next step before any work is booked."
        crumbs={[{ name: "Request a quote", href: "/request-a-quote" }]}
      />
      <section className="section">
        <div className="container content-grid">
          <div>
            <Suspense
              fallback={
                <p>Loading the project form… You can also call 604-627-0166.</p>
              }
            >
              <Form searchParams={searchParams} />
            </Suspense>
          </div>
          <aside className="panel">
            <p className="eyebrow">HELPFUL TO INCLUDE</p>
            <h2>A clear picture of the job.</h2>
            <ul className="check-list">
              <li>What you want repaired or installed</li>
              <li>Approximate sizes and quantities</li>
              <li>Property type and access details</li>
              <li>Materials you already have</li>
              <li>Your preferred timing</li>
            </ul>
            <p style={{ marginTop: 24 }}>
              Photos are welcome by email. Please include a close-up and a wider
              view of the area.
            </p>
            <p>
              Prefer to talk it through?
              <br />
              <a href="tel:+16046270166">604-627-0166</a>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
