import { PageIntro } from "@/components/shared";
import { metadata as makeMetadata, site } from "@/lib/site";
export const metadata = makeMetadata(
  "Privacy Notice",
  "How Saeed Contracting handles contact and quote-request information, website hosting data and enquiries about your personal information.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR INFORMATION"
        title="Privacy notice"
        description="How information is handled when you visit this site or enquire about a project."
        crumbs={[{ name: "Privacy", href: "/privacy" }]}
      />
      <section className="section">
        <div className="container prose privacy">
          <p>Last updated: 28 September 2026.</p>
          <h2>Information you choose to share</h2>
          <p>
            When you contact Saeed Contracting, you may provide your name, phone
            number, email address, city or neighbourhood, project details,
            timing and photos. We use this information to respond to your
            enquiry, assess the work, prepare a quote and coordinate services
            you request.
          </p>
          <h2>The quote-request form</h2>
          <p>
            When the form offers “Prepare email request”, your entries stay in
            the current page until you choose to open your email app or copy
            them. Preparing a draft does not send a request. You must send the
            email yourself. Your email provider then processes the message under
            its own privacy terms.
          </p>
          <p>
            If direct submission is enabled, the form clearly offers “Send quote
            request”. Information is sent to our business inbox through our
            email-delivery provider, Resend. An anti-spam check through
            Cloudflare Turnstile is used in that mode. We do not store form
            entries in a website database.
          </p>
          <h2>Hosting and service providers</h2>
          <p>
            This website is hosted by Vercel. Hosting and security services may
            process technical information such as IP addresses, requested pages,
            browser information and error logs to operate and protect the site.
            Email and hosting providers may process information outside Canada.
          </p>
          <h2>Analytics and cookies</h2>
          <p>
            The site does not currently load advertising trackers or Google
            Analytics. Basic hosting and security processing still occurs. If
            optional analytics are introduced, this notice and any appropriate
            controls will be updated.
          </p>
          <h2>Keeping information</h2>
          <p>
            Project correspondence may be retained in our business email and
            records as needed to respond to enquiries, manage work and maintain
            required business records. Avoid sending payment-card details,
            identification documents, access codes or other sensitive
            information through the quote form.
          </p>
          <h2>Your questions and requests</h2>
          <p>
            To ask about your information, request a correction or discuss
            deletion of an enquiry, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. We may need to
            confirm your identity and consider record-keeping obligations before
            acting on a request.
          </p>
          <h2>Photos</h2>
          <p>
            Send only photos you are authorised to share. Where possible, leave
            people, private documents and personal belongings out of project
            photos. Photographs submitted for a quote are not automatically
            authorised for public marketing.
          </p>
        </div>
      </section>
    </>
  );
}
