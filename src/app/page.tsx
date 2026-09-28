import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/brand";
import { Cta, Faq } from "@/components/shared";
import { ServiceGrid } from "@/components/service-grid";
import { metadata as makeMetadata, site, homeFaqs } from "@/lib/site";
export const metadata = makeMetadata(
  "North Vancouver Contracting & Property Services",
  "Saeed Contracting provides repairs, home maintenance, painting, TV mounting and property services in North Vancouver and Greater Vancouver. Request a quote.",
  "/",
);
const process = [
  [
    "Tell us about your project",
    "Share the work, location and timing you have in mind.",
  ],
  [
    "We review the scope",
    "We discuss the details, access and what the job requires.",
  ],
  [
    "Schedule the work",
    "Agree on the scope and price, then find a suitable time.",
  ],
  [
    "Take care of the details",
    "Complete the agreed work and review it together.",
  ],
];
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">NORTH VANCOUVER & GREATER VANCOUVER</p>
            <h1>
              Good work.
              <br />
              In every <em>detail.</em>
            </h1>
            <p className="lead">
              Professional contracting & property services.
              <br />
              Repairs, maintenance and installations for the spaces you live and
              work in.
            </p>
            <div className="hero-actions">
              <Link href="/request-a-quote" className="button button-light">
                Request a quote <Arrow diagonal />
              </Link>
              <a className="hero-call" href={`tel:${site.tel}`}>
                {site.phone} <Arrow />
              </a>
            </div>
            <p className="hero-foot">LOCAL SERVICE. CONSIDERED WORKMANSHIP.</p>
          </div>
          <figure className="hero-visual">
            <Image
              src="/images/architecture.webp"
              alt="Illustrative Pacific Northwest home with cedar cladding, precise trim and a forest outlook"
              fill
              sizes="(max-width:640px) 100vw, 55vw"
              loading="eager"
              fetchPriority="high"
            />
            <figcaption className="visual-caption">
              Architectural illustration · West Coast inspiration
            </figcaption>
          </figure>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container trust-inner">
          <div className="trust-types">
            <span>Residential</span>
            <span>Strata</span>
            <span>Commercial</span>
          </div>
          <span>Reliable service. Clear scope. Fair pricing.</span>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">WHAT WE DO</p>
              <h2>
                One property.
                <br />
                <em>Many ways to help.</em>
              </h2>
            </div>
            <div>
              <p>
                From a repair that has waited too long to the finishing touches
                on a room. Find the right service for your next project.
              </p>
              <Link href="/services" className="text-link">
                View all services <Arrow />
              </Link>
            </div>
          </div>
          <ServiceGrid />
        </div>
      </section>
      <section className="section dark-section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">THE SAEED APPROACH</p>
            <h2>
              Your space deserves
              <br />
              <em>careful attention.</em>
            </h2>
            <p className="lead" style={{ marginTop: 28 }}>
              Good contracting starts with listening. Understanding the job,
              agreeing on the details and respecting the property are part of
              the work.
            </p>
            <Link href="/about" className="text-link">
              Get to know us <Arrow />
            </Link>
          </div>
          <div className="values">
            {[
              [
                "Clear from the start",
                "A practical conversation about scope, materials and price before work begins.",
              ],
              [
                "Care in the details",
                "Attention to fit, finish and the spaces around the work.",
              ],
              [
                "A local point of contact",
                "Straightforward communication for homeowners, strata and businesses.",
              ],
            ].map(([t, d], n) => (
              <div key={t} className="value">
                <span>0{n + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">FROM FIRST CALL TO FINAL DETAIL</p>
              <h2>A straightforward process.</h2>
            </div>
            <p>
              Know what happens next, whether you have one small repair or a
              full list of maintenance tasks.
            </p>
          </div>
          <div className="process-grid">
            {process.map(([t, d], n) => (
              <article className="process-card" key={t}>
                <span className="display">0{n + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <div className="project-types" aria-label="Common project enquiries">
            <span>Move-in to-do lists</span>
            <span>Rental refreshes</span>
            <span>Seasonal upkeep</span>
            <span>Outdoor repairs</span>
            <span>Room finishing touches</span>
          </div>
        </div>
      </section>
      <section className="section area-section">
        <div className="container split-section">
          <div>
            <p className="eyebrow">CLOSE TO HOME</p>
            <h2>
              North Shore roots.
              <br />
              <em>Greater Vancouver reach.</em>
            </h2>
            <p className="lead" style={{ marginTop: 28 }}>
              Serving homes, strata properties and businesses in North Vancouver
              and neighbouring communities. Tell us where your project is, and
              we’ll confirm availability.
            </p>
            <Link href="/service-areas" className="text-link">
              Explore our service area <Arrow />
            </Link>
          </div>
          <ul className="area-list">
            {site.areas.map((a, n) => (
              <li key={a}>
                <span>{a}</span>
                {n === 0 ? (
                  <small>Primary service area</small>
                ) : (
                  <Arrow diagonal />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container faq-layout">
          <div>
            <p className="eyebrow">A FEW USEFUL ANSWERS</p>
            <h2>
              Before we
              <br />
              <em>get started.</em>
            </h2>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>
      <Cta />
    </>
  );
}
