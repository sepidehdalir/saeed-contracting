import Link from "next/link";
import { services } from "@/lib/services";
import { Arrow } from "./brand";
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s, n) => (
        <article key={s.slug} className="service-card">
          <span className="service-number">
            {String(n + 1).padStart(2, "0")} /
          </span>
          <h3>
            <Link href={`/services/${s.slug}`}>{s.name}</Link>
          </h3>
          <p>{s.short}</p>
          <span className="card-arrow" aria-hidden="true">
            Explore service <Arrow diagonal />
          </span>
        </article>
      ))}
    </div>
  );
}
