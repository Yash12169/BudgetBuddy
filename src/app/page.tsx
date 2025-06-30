import Accomplishments from "@/components/Accomplishments/accomplishments";

import Faq from "@/components/FAQ/faq";
import Features from "@/components/Features/features";
import LandFooter from "@/components/Footer/LandFooter/landFooter";
import Hero from "@/components/Hero/hero";
import Navbar2 from "@/components/Navbar/navbar2";
import { TextParallax } from "@/components/ui/textParallax";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#FFF8ED]">
      <Navbar2 />
      <main className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-[8rem] pt-16 md:pt-0">
        <Hero />
        <TextParallax />
        <Accomplishments />
        <Features />
        <Faq />
        <LandFooter />
      </main>
    </div>
  );
}
