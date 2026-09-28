import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>
          Let’s get you
          <br />
          back on track.
        </h1>
        <p className="lead" style={{ marginTop: 24 }}>
          This page isn’t available. Explore our current services or tell us
          about your project.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link className="button button-dark" href="/">
            Back to home
          </Link>
          <Link className="text-link" href="/services">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
