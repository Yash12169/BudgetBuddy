import Allocation from "@/components/Cards/Allocation";
import Disclaimer from "@/components/Cards/Disclaimer";
import NetWorth from "@/components/Cards/NetWorth";
import RiskProfile from "@/components/Cards/RiskProfile";
import StarterCard from "@/components/Cards/starterCard";
import Faq from "@/components/FAQ/faq";
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

export default function Home() {
  return (
   <div className="flex flex-col">
     <Navbar2/>
    <Hero/>
    <Faq/>
    <LandFooter/>
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
        
      </div>
    </Layout>
   </div>
  );
}
