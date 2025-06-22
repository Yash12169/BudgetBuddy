"use client";

import * as React from "react";
import { LogOut, Wallet, Sparkles } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import finalgoalGif from "../assets/finalgoal.gif";
import finalgoalPng from "../assets/finalgoal.png";
import dashboardGif from "../assets/dashboardi.gif";
import dashboardPng from "../assets/dashboardi.png";
import analysisGif from "../assets/analysis.gif";
import analysisPng from "../assets/analysis.png";
import profileGif from "../assets/profilei.gif";
import profilePng from "../assets/profilei.png";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      webmIcon: dashboardGif.src,
      staticIcon: dashboardPng.src,
      isActive: true,
    },
    {
      title: "Financial Checkup",
      url: "/user/financial-checkup",
      webmIcon: analysisGif.src,
      staticIcon: analysisPng.src,
      isActive: true,
    },
    {
      title: "My Goals",
      url: "/user/goals",
      webmIcon: finalgoalGif.src,
      staticIcon: finalgoalPng.src,
      isActive: true,
    },
    {
      title: "Profile",
      url: "/user/profile",
      webmIcon: profileGif.src,
      staticIcon: profilePng.src,
      isActive: true,
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [burst, setBurst] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    setIsSigningOut(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 500);
    // Navigate to home page after sign out
    setTimeout(() => router.push("/"), 1000);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-4 pb-6 border-b bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        {/* Background deco */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 dark:from-emerald-400/10 dark:via-blue-400/10 dark:to-purple-400/10"></div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-200/20 via-blue-200/20 to-purple-200/20 dark:from-emerald-400/10 dark:via-blue-400/10 dark:to-purple-400/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>

        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-500 opacity-80 blur-sm"></div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
            <Wallet className="relative z-10 h-5 w-5 text-white drop-shadow-sm" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
          </div>

          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 dark:from-emerald-400 dark:via-blue-400 dark:to-purple-400">
              BudgetBuddy
            </h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col flex-1 justify-between">
        <NavMain items={data.navMain} />

        <div className="p-3 pb-8 border-t border-border/50">
          <SignOutButton>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="relative flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 border border-red-500/30 px-3 py-2.5 text-sm font-extrabold text-red-700 dark:text-red-200 transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
            >
              <AnimatePresence>
                {burst && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: [0, 1, 0] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-lg pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="relative">
                {isSigningOut ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <LogOut className="h-4 w-4 transition-transform group-hover:scale-110" />
                )}
              </div>

              <span className="whitespace-nowrap group-data-[collapsible=icon]:hidden">
                {isSigningOut ? "Signing Out..." : "Sign Out"}
              </span>

              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 via-red-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </SignOutButton>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}