import Layout from "@/components/Layout/layout";
import Tester from "@/components/Tester/tester";
import ThemeController from "@/components/ThemeController/themeController";

export default function Home() {
  return (
    <Layout>
      <ThemeController/>
      <Tester/>
    </Layout>
  );
}
