import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import WhoIsItFor from "../components/WhoIsItFor";
import CurriculumSection from "../components/CurriculumSection";
import InclusionsSection from "../components/InclusionsSection";
import PricingCard from "../components/PricingCard";
import MentorProfile from "../components/MentorProfile";
import TestimonialsSection from "../components/TestimonialsSection";
import HowItWorks from "../components/HowItWorks";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import StickyMobileBar from "../components/StickyMobileBar";
import { getOffer, getMentor } from "../lib/storage";
import { defaultCurriculum, defaultTestimonials, defaultFaqs } from "../lib/data/default-content";

// Force dynamic rendering so changes in admin dashboard reflect immediately
export const dynamic = "force-dynamic";

export default function Home() {
  const offer = getOffer();
  const mentor = getMentor();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">
        <Hero mentor={mentor} offer={offer} />
        <AboutSection />
        <WhoIsItFor />
        <CurriculumSection curriculum={defaultCurriculum} />
        <InclusionsSection />
        <PricingCard offer={offer} />
        <MentorProfile mentor={mentor} />
        <TestimonialsSection testimonials={defaultTestimonials} />
        <HowItWorks />
        <FaqSection faqs={defaultFaqs} />
      </main>
      <Footer />
      <StickyMobileBar offer={offer} />
    </div>
  );
}
