"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Disclaimer from "../Cards/Disclaimer";
import StarterCard from "../Cards/starterCard";
import FinancialScore from "../Cards/FinancialScore";
import { SignOutButton } from "@clerk/nextjs";
import Goals from "../Cards/Goals";
import GoalTracker from "../Cards/GoalTracker";
export default function Sidebar() {

  
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
                  <BreadcrumbLink href="/user/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <ThemeController /> */}
          <SignOutButton/>
        </header>
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl h-fit w-full">
              <StarterCard />
            </div>
            <div className="rounded-xl h-fit col-span-2 ">
              <GoalTracker />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <FinancialScore />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min mt-2 mb-16 md:mb-4">
            <Goals />
          </div>
          <Disclaimer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
