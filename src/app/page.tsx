
import Accomplishments from "@/components/Accomplishments/accomplishments";
import Allocation from "@/components/Cards/Allocation";
import Disclaimer from "@/components/Cards/Disclaimer";
import NetWorth from "@/components/Cards/NetWorth";
import RiskProfile from "@/components/Cards/RiskProfile";
import StarterCard from "@/components/Cards/starterCard";

import Faq from "@/components/FAQ/faq";
import Features from "@/components/Features/features";
import LandFooter from "@/components/Footer/LandFooter/landFooter";
import Hero from "@/components/Hero/hero";
import Navbar2 from "@/components/Navbar/navbar2";
import { TextParallax } from "@/components/ui/textParallax";

import SignUpModal from "@/components/SignUpForm/SignUpModal";
import { SignupForm } from "@/components/SignUpForm/SignUpForm";



export default function Home() {
  return (
      <div className="flex flex-col gap-[8rem] bg-[#FFF8ED] pb-[2.5rem]">
        <Navbar2 />
        <Hero />
        <TextParallax />
        <Accomplishments />
        <Features />
        <Faq />
        <LandFooter />
      </div>
  );
}
