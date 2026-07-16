import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import FeatureCards from "@/components/FeatureCards";
import Services from "@/components/Services";
import Promise from "@/components/Promise";
import BeforeAfter from "@/components/BeforeAfter";
import GalleryStrip from "@/components/GalleryStrip";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <FeatureCards />
      <Services />
      <Promise />
      <BeforeAfter />
      <GalleryStrip />
      <Plans />
      <Testimonials />
    </>
  );
}
