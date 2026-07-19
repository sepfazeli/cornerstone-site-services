import type { Metadata } from "next";
import { Squada_One, Archivo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";
import { site, serviceAreas } from "@/lib/site";
import "./globals.css";

const squada = Squada_One({
  variable: "--font-squada",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cornerstone Site Services | Power Washing & Exterior Cleaning in Orange County",
    template: "%s | Cornerstone Site Services",
  },
  description: site.description,
  keywords: [
    "power washing Orange County",
    "pressure washing Irvine",
    "window cleaning Orange County",
    "roof washing Orange County",
    "gutter cleaning Newport Beach",
    "solar panel cleaning Orange County",
    "house washing Orange County",
    "holiday lights installation Orange County",
    "paver resanding",
    "exterior cleaning subscription",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Cornerstone Site Services — Power Washing & Exterior Cleaning, Orange County",
    description: site.description,
    images: [{ url: "/images/home-2.jpg", width: 1600, height: 1067, alt: "Freshly washed Orange County home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornerstone Site Services — Orange County Exterior Cleaning",
    description: site.description,
    images: ["/images/home-2.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  legalName: site.legalName,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/home-2.jpg`,
  logo: `${site.url}/icon.svg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "US",
  },
  areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Power Washing & House Washing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Window, Gutter & Roof Cleaning" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar Panel Cleaning" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Holiday Light Installation" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${squada.variable} ${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCall />
      </body>
    </html>
  );
}
