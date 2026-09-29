import Link from "next/link";
import { PageIntro, Cta } from "@/components/shared";
import { metadata as makeMetadata } from "@/lib/site";
import { projectTemplates } from "@/lib/projects";
export const metadata = makeMetadata(
  "Projects & Project-Story Templates",
  "Explore six reusable project-story templates for documenting repairs, maintenance and installations. Templates only; no completed client projects are claimed.",
  "/projects",
);
export default function Projects() {
  return (
    <>
      <PageIntro
        eyebrow="PROJECTS"
        title="A clear record of the work."
        description="A useful project story explains the starting condition, agreed scope and work completed. Our library begins with reusable templates for recording those details honestly."
        crumbs={[{ name: "Projects", href: "/projects" }]}
      />
      <section className="section">
        <div className="container">
          <div className="panel">
            <h2>Templates, not completed projects.</h2>
            <p>
              No completed client projects are published here yet. The six
              resources below are blank editorial frameworks. They contain
              prompts, not client names, project photos, results or
              testimonials.
            </p>
            <p>
              To publish a real story, we need verified work details and
              permission to use the text and photographs. A project enquiry is
              always reviewed separately; a template does not promise a
              particular result.
            </p>
          </div>
          <div className="service-grid" style={{ marginTop: 32 }}>
            {projectTemplates.map((template) => (
              <article className="service-card" key={template.slug}>
                <p className="eyebrow">REUSABLE TEMPLATE</p>
                <h2>
                  <Link href={`/projects/templates/${template.slug}`}>
                    {template.title}
                  </Link>
                </h2>
                <p>{template.summary}</p>
                <Link
                  className="text-link"
                  href={`/projects/templates/${template.slug}`}
                >
                  View the blank story framework
                </Link>
              </article>
            ))}
          </div>
          <div className="prose" style={{ marginTop: 40 }}>
            <h2>Planning work of your own?</h2>
            <p>
              Browse our{" "}
              <Link className="text-link" href="/services">
                current services
              </Link>
              , check{" "}
              <Link className="text-link" href="/service-areas">
                service coverage
              </Link>
              , or{" "}
              <Link className="text-link" href="/contact">
                contact us about your scope
              </Link>
              . You do not need to write a project story to request a quote.
            </p>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
