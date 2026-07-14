import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Plans from "@/components/Plans";
import QuoteForm from "@/components/QuoteForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { faqs } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TrustMarquee />
      <Services />
      <BeforeAfter />
      <Plans />
      <QuoteForm />
      <Testimonials />
      <FAQ />
    </>
  );
}
