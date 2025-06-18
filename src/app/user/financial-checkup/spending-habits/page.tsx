"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Disclaimer from "@/components/Cards/Disclaimer";
import HabitEdit from "@/components/Cards/HabitEdit";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FinancialSidebar() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/user/financial-checkup">
                    Financial Checkup
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbLink href="/user/financial-checkup/spending-habits">
                  <BreadcrumbPage>Spending Habits</BreadcrumbPage>
                </BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <ThemeController /> */}
          {/* <SignOutButton /> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <HabitEdit/>
          <Disclaimer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
