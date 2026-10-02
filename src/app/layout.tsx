import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-mono-berkeley",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.png` },
  metadataBase: new URL("https://cworksug.com"),
  title: {
    default: "CWorks — We design, build, and ship digital products",
    template: "%s — CWorks",
  },
  description:
    "CWorks is a software studio in Kampala, Uganda. We build websites, systems, databases, and brands for businesses that need software that actually fits.",
  keywords: [
    "CWorks",
    "software company Uganda",
    "web development Kampala",
    "custom systems Uganda",
    "UI UX design Uganda",
  ],
  openGraph: {
    title: "CWorks — We design, build, and ship digital products",
    description:
      "A software studio in Kampala, Uganda. Websites, systems, databases, and brands.",
    url: "https://cworksug.com",
    siteName: "CWorks",
    locale: "en_UG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CWorks — software studio in Kampala, Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CWorks — We design, build, and ship digital products",
    description:
      "A software studio in Kampala, Uganda. Websites, systems, databases, and brands.",
    images: ["/og-image.png"],
  },
};
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${instrument.variable}`}
      // The inline script in <head> adds a `js` class before React hydrates;
      // this attribute tells React not to flag that deliberate difference.
      suppressHydrationWarning
    >
      <head>
        {/* Brand serifs. These are Monotype faces licensed to Google and served from
            Google's CDN — their licence forbids copying or converting the files, so
            they are linked here rather than self-hosted via next/font/google.
            Supplied by DESIGN.md tokens (font-hero-role / font-name / font-contact /
            font-wordmark); the site's own UI still renders in Inter. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- that rule targets
            the Pages Router (pages/_document.js); in the App Router a link in the root
            layout is already global, so the warning does not apply here. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Book+Antiqua:ital,wght@0,400;0,700;1,400;1,700&family=Bookman+Old+Style:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        />
        <script
          // Marks the document JS-capable so entrance animations only enhance
          // an already-visible page — never hide content from crawlers/no-JS.
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(location.search.includes('static'))document.documentElement.classList.add('static')`,
          }}
        />
      </head>
      <body className="grain">
        <StructuredData />
        <LenisProvider />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
