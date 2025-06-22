"use client";
import { AppSidebar } from "@/components/app-sidebar";
import BasicFinancialNumbers from "@/components/Cards/BasicFinancialNumbers";
import DebtEdit from "@/components/Cards/DebtEdit";
import Disclaimer from "@/components/Cards/Disclaimer";
import ProfileCard from "@/components/Cards/ProfileCard";
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

export default function Page() {
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
                  <BreadcrumbLink href="/user/profile">
                    Profile
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <ThemeController /> */}
          {/* <SignOutButton /> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ProfileCard/>
          <BasicFinancialNumbers/>
          <Disclaimer/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
