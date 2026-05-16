import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_DESC, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
  },
};

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESC,
    },
    {
      "@type": "Dataset",
      "@id": `${SITE_URL}/#dataset`,
      name: "Papal Succession Dataset",
      description:
        "Structured dataset of the popes from Peter to the current pope, with pontificate dates and succession links sourced from the Holy See's Pontiffs table.",
      url: SITE_URL,
      license: "https://creativecommons.org/licenses/by/4.0/",
      keywords: ["Popes", "Papacy", "Bishop of Rome", "Papal succession", "Holy See"],
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: `${SITE_URL}/api/people.json`,
          name: "Popes (JSON)",
        },
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: `${SITE_URL}/api/relationships.json`,
          name: "Succession relationships (JSON)",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldGraph) }}
        />
        <header className="border-b border-ink/10 bg-parchment/85 backdrop-blur sticky top-0 z-20">
          <nav className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 py-3">
              <Link href="/" className="flex items-center gap-2 font-serif text-xl tracking-tight">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.svg" alt="" width={24} height={24} className="shrink-0" />
                Papal Succession
              </Link>
              <div className="ml-auto flex items-center gap-3 sm:gap-4 text-sm">
                <Link href="/start-here" className="hover:text-accent">
                  Start
                </Link>
                <Link href="/directory" className="hover:text-accent">
                  Directory
                </Link>
                <Link href="/about" className="hover:text-accent">
                  Method
                </Link>
                <Link href="/support" className="hidden sm:inline hover:text-accent">
                  Support
                </Link>
              </div>
              <span className="hidden sm:inline text-xs text-ink/50">AD 30 — present</span>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-ink/10 py-8 text-center text-xs text-ink/50">
          <div>
            Data derived from{" "}
            <a
              href="https://www.vatican.va/content/vatican/en/holy-father.html"
              className="hover:text-accent underline decoration-ink/20 underline-offset-4"
            >
              The Holy See, Pontiffs
            </a>
            {" · "}
            <a href="/api/people.json" className="hover:text-accent">
              people.json
            </a>
            {" · "}
            <a href="/api/relationships.json" className="hover:text-accent">
              relationships.json
            </a>
            {" · "}
            <a href="/llms.txt" className="hover:text-accent">
              llms.txt
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
