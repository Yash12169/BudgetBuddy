"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import dashboardx from "../assets/dashboardx.svg";
import analysisx from "../assets/analysisx.svg";
import goalx from "../assets/goalx.svg";
import profilex from "../assets/profilex.svg";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: dashboardx,
      isActive: true,
      description: "Overview & insights",
    },
    {
      title: "Financial Checkup",
      url: "/user/financial-checkup",
      icon: analysisx,
      isActive: true,
      description: "Analyze your finances",
    },
    {
      title: "My Goals",
      url: "/user/goals",
      icon: goalx,
      isActive: true,
      description: "Track your targets",
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: profilex,
      isActive: true,
      description: "Manage your account",
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const router = useRouter();
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="group/sidebar data-[collapsible=icon]:w-14 w-80 min-w-14 transition-all duration-300 bg-base-100 border-r border-base-300 relative overflow-hidden sticky top-0 h-screen"
    >
      <SidebarHeader className="relative flex items-center h-20 group-data-[collapsible=icon]/sidebar:h-16 border-b border-base-300 transition-all duration-300 bg-base-200">
        <motion.div
          className="flex items-center w-full h-full gap-4 min-w-0 overflow-hidden"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        >
          <div className="flex items-center justify-center w-12 h-12 group-data-[collapsible=icon]/sidebar:w-8 group-data-[collapsible=icon]/sidebar:h-8 ml-2 sm:w-10 sm:h-10">
            <Image
              src="https://as2.ftcdn.net/v2/jpg/00/79/77/00/1000_F_79770058_2QwQ6l04e6MN2eUVxZ4WRzE7dHGnQk8A.jpg"
              alt="BudgetBuddy Logo"
              width={48}
              height={48}
              className="object-contain rounded-xl shadow-lg border-2 border-base-300"
              style={{
                minHeight: "36px",
                minWidth: "36px",
                maxHeight: "48px",
                maxWidth: "48px",
                display: "block",
              }}
            />
          </div>
          {state !== "collapsed" && (
            <h1 className="text-2xl sm:text-xl font-extrabold text-base-content tracking-wide break-words text-wrap max-w-xs leading-tight">
              BudgetBuddy
            </h1>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="relative flex flex-col flex-1 justify-between bg-base-200">
        <div
          className={`p-4 space-y-2 ${
            state === "collapsed"
              ? "flex flex-col items-center justify-center gap-2"
              : ""
          }`}
        >
          {data.navMain.map((item) => (
            <motion.a
              key={item.title}
              href={item.url}
              className={`relative flex items-center rounded-2xl p-3 group-data-[collapsible=icon]/sidebar:p-2 bg-base-200 hover:bg-base-300 transition-all duration-200 ${
                state === "collapsed" ? "justify-center w-full" : ""
              }`}
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={`flex-shrink-0 ${
                  state === "collapsed"
                    ? "w-8 h-8 flex items-center justify-center mx-auto"
                    : "w-10 h-10"
                }`}
              >
                <Image
                  src={item.icon.src}
                  alt={`${item.title} icon`}
                  width={44}
                  height={44}
                  className={`mx-auto object-contain transition-all duration-200 ${
                    state === "collapsed" ? "w-8 h-8" : "w-10 h-10"
                  }`}
                  style={{
                    minWidth: "28px",
                    minHeight: "28px",
                    maxWidth: "44px",
                    maxHeight: "44px",
                    display: "block",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>
              {state !== "collapsed" && (
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-base text-base-content">
                    {item.title}
                  </p>
                  <p className="text-sm text-base-content/70">
                    {item.description}
                  </p>
                </div>
              )}
              {state !== "collapsed" && (
                <motion.div
                  animate={{ x: hoveredItem === item.title ? 6 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronRight className="w-4 h-4 text-base-content/50 opacity-0 group-hover:opacity-70" />
                </motion.div>
              )}
            </motion.a>
          ))}
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
