import type { Metadata } from "next";
import Hero from "@/components/Hero";
import {
  TrustStrip,
  ServicesSection,
  IndustriesSection,
  WorkFeature,
  ProcessSection,
  StatsSection,
  CTABand,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "CWorks — We design, build, and ship digital products",
  description:
    "CWorks is a software studio in Kampala, Uganda. Websites, custom systems, databases, and brands — built end-to-end for businesses that need software that fits.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <WorkFeature />
      <IndustriesSection />
      <ProcessSection />
      <StatsSection />
      <CTABand />
    </>
  );
}
