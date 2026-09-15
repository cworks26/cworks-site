import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  icons: { icon: "/favicon.png" },
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
        <script
          // Marks the document JS-capable so entrance animations only enhance
          // an already-visible page — never hide content from crawlers/no-JS.
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(location.search.includes('static'))document.documentElement.classList.add('static')`,
          }}
        />
      </head>
      <body className="grain">
        <LenisProvider />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
