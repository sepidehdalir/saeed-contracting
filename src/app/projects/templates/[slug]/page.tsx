import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/shared";
import { metadata as makeMetadata } from "@/lib/site";
import { projectTemplates, projectTemplateText } from "@/lib/projects";
import { getService } from "@/lib/services";
export const dynamicParams = false;
export function generateStaticParams() {
  return projectTemplates.map(({ slug }) => ({ slug }));
}
async function getTemplate(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const template = projectTemplates.find((t) => t.slug === slug);
  if (!template) notFound();
  return template;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const template = await getTemplate(params);
  return {
    ...makeMetadata(
      template.title,
      template.summary,
      `/projects/templates/${template.slug}`,
    ),
    robots: { index: false, follow: true },
  };
}
export default async function Template({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const template = await getTemplate(params);
  return (
    <>
      <PageIntro
        eyebrow="BLANK PROJECT-STORY TEMPLATE"
        title={template.title}
        description={template.summary}
        crumbs={[
          { name: "Projects", href: "/projects" },
          {
            name: template.title,
            href: `/projects/templates/${template.slug}`,
          },
        ]}
      />
      <section className="section">
        <div className="container prose">
          <div className="panel">
            <h2>Not a completed project.</h2>
            <p>
              This is a reusable writing template. No work, customer, photograph
              or outcome is represented as real. Copy the framework and replace
              prompts only with documented facts and approved images.
            </p>
          </div>
          <h2 style={{ marginTop: 32 }}>Reusable story framework</h2>
          <pre className="project-template">
            {projectTemplateText(template)}
          </pre>
          <h2>Before a real story is published</h2>
          <p>
            Confirm the completed scope, review every factual statement and
            obtain permission for public use. Keep private property and client
            details out of the story. If there is no verified outcome or
            approved photo, leave that material unpublished rather than filling
            the gap with an example.
          </p>
          <h2>Related services</h2>
          <ul>
            {template.serviceSlugs.map((slug) => {
              const service = getService(slug);
              return service ? (
                <li key={slug}>
                  <Link className="text-link" href={`/services/${slug}`}>
                    {service.name}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
          <p>
            <Link className="text-link" href="/projects">
              All six project-story templates
            </Link>{" "}
            ·{" "}
            <Link className="text-link" href="/request-a-quote">
              Request a quote
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
