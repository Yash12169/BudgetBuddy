import Disclaimer from "@/components/Cards/Disclaimer";
import Layout from "@/components/Layout/layout";
import { SidebarDemo } from "@/components/Navbar/navbar";
import Tester from "@/components/Tester/tester";
import ThemeController from "@/components/ThemeController/themeController";

export default function Home() {
  return (
    <Layout>
      <div className="w-screen h-screen px-3 gap-5 flex flex-col">
        <ThemeController />
        <Disclaimer />
      </div>
    </Layout>
  );
}
