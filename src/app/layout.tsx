import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/header";
import { Footer, JsonLd } from "@/components/shared";
import { site } from "@/lib/site";
import "./globals.css";
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Saeed Contracting | North Vancouver Contracting & Property Services",
    template: "%s | Saeed Contracting",
  },
  description:
    "Professional repairs, maintenance and installations for homes, strata and businesses in North Vancouver and Greater Vancouver.",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};
export const viewport: Viewport = {
  themeColor: "#0b1b2a",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA">
      <body className={`${sans.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "GeneralContractor",
                "@id": `${site.url}/#business`,
                name: site.name,
                url: site.url,
                telephone: site.tel,
                email: site.email,
                logo: `${site.url}/brand/logo-full.svg`,
                image: `${site.url}/opengraph-image`,
                areaServed: site.areas.map((name) => ({
                  "@type": "City",
                  name,
                })),
                description:
                  "General contracting, repairs, maintenance, installations and property services in North Vancouver and Greater Vancouver.",
              },
              {
                "@type": "WebSite",
                "@id": `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: "en-CA",
                publisher: { "@id": `${site.url}/#business` },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
