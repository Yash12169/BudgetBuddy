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
import Layout from "@/components/Layout/layout";
import Navbar, { NavbarDemo, SidebarDemo } from "@/components/Navbar/navbar";
import Navbar2 from "@/components/Navbar/navbar2";
import Tester from "@/components/Tester/tester";
import ThemeController from "@/components/ThemeController/themeController";
import HeroImage from "@/components/ui/heroImage";
import InvestmentChart from "@/components/ui/investmentChart";
import { Network } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import WaitScroller from "@/components/WaitScroller/waitScroller";
import { TextParallax } from "@/components/ui/textParallax";

export default function Home() {
  return (
    <div className="flex flex-col gap-[8rem] bg-[#FFF8ED] pb-[2.5rem]">
      <Navbar2 />
      <Hero />
      <TextParallax/>
      <Accomplishments />
      <Features />
      <Faq />
      <LandFooter />
      {/* <WaitScroller /> */}
{/*       
      <Layout>
        <div className="w-screen h-screen  gap-5 flex flex-col">
          {/* <NavbarDemo/> */}

          {/* <Disclaimer /> */}
          {/* <div className="flex gap-5"> */}
          {/* <RiskProfile/> */}
          {/* <StarterCard/> */}
          {/* </div> */}
          {/* <LandFooter/> */}
          {/* <HeroImage/> */}

          {/* <ThemeController /> */}
        {/* </div> */}
      {/* </Layout> */} 
    </div>
  );
}
