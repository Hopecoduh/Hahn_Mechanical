import React from "react";
import HeroSection from "../components/home/HeroSection";
import ServicesPreview from "../components/home/ServicesPreview";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      <CTASection />
    </div>
  );
}