import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCall from "@/components/StickyCall";
import { site, serviceAreas } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cornerstone Site Services | Pressure Washing & Auto Detailing in Los Angeles",
    template: "%s | Cornerstone Site Services",
  },
  description: site.description,
  keywords: [
    "pressure washing Los Angeles",
    "power washing LA",
    "house soft wash Los Angeles",
    "driveway cleaning Los Angeles",
    "mobile auto detailing Los Angeles",
    "car detailing near me",
    "exterior cleaning subscription",
    "patio cleaning Los Angeles",
    "commercial pressure washing LA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Cornerstone Site Services — Pressure Washing & Auto Detailing, Los Angeles",
    description: site.description,
    images: [{ url: "/images/home-2.jpg", width: 1600, height: 1067, alt: "Freshly washed Los Angeles home at dusk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornerstone Site Services — LA Exterior Cleaning & Auto Detailing",
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
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pressure Washing & Exterior Soft Wash" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Auto Detailing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Subscription Exterior Care Plans" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
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
