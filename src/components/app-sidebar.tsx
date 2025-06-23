"use client";

import * as React from "react";
import { LogOut, ChevronRight } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import dashboardx from "../assets/dashboardx.png";
import analysisx from "../assets/analysisx.png";
import goalx from "../assets/goalx.png";
import profilex from "../assets/profilex.png";

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
  const [burst, setBurst] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const router = useRouter();
  const { state } = useSidebar();

  const handleSignOut = () => {
    setIsSigningOut(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 500);
    setTimeout(() => router.push("/"), 1000);
  };

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="group/sidebar data-[collapsible=icon]:w-14 w-80 min-w-14 transition-all duration-300 bg-gradient-to-br from-blue-25/80 via-sky-25/75 to-slate-50/80 dark:from-slate-900/90 dark:via-blue-950/85 dark:to-slate-900/90 backdrop-blur-xl relative overflow-hidden"
    >
      <SidebarHeader className="relative flex items-center h-20 group-data-[collapsible=icon]/sidebar:h-16 border-b border-blue-100/40 dark:border-blue-800/40 transition-all duration-300">
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
              className="object-contain rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-800"
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
            <h1 className="text-2xl sm:text-xl font-extrabold text-blue-800 dark:text-blue-200 tracking-wide break-words text-wrap max-w-xs leading-tight">
              BudgetBuddy
            </h1>
          )}
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="relative flex flex-col flex-1 justify-between">
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
              className={`relative flex items-center rounded-2xl p-3 group-data-[collapsible=icon]/sidebar:p-2 hover:bg-blue-100/20 dark:hover:bg-blue-900/20 transition-all duration-200 ${
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
                  <p className="font-semibold text-base text-blue-700 dark:text-blue-300">
                    {item.title}
                  </p>
                  <p className="text-sm text-blue-500 dark:text-blue-400">
                    {item.description}
                  </p>
                </div>
              )}
              {state !== "collapsed" && (
                <motion.div
                  animate={{ x: hoveredItem === item.title ? 6 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-70" />
                </motion.div>
              )}
            </motion.a>
          ))}
        </div>

        <div className="p-4 border-t border-blue-100/40 dark:border-blue-800/40">
          <SignOutButton>
            <motion.button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="relative flex w-full items-center rounded-2xl p-3 group-data-[collapsible=icon]/sidebar:p-2 bg-red-100/20 dark:bg-red-900/20 hover:bg-red-100/40 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex-shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              {state !== "collapsed" && (
                <span className="ml-3">
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </span>
              )}
              <AnimatePresence>
                {burst && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 2],
                      opacity: [0, 0.6, 0],
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 bg-red-300/20 rounded-2xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </SignOutButton>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
