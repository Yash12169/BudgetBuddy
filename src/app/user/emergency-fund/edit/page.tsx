"use client";
import EmergencyFundEdit from "@/components/Cards/EmergencyFundEdit";
import { themes, theme as ThemeType } from "@/components/ThemeController/themeController";

export default function EmergencyFundEditPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f6fa] p-4">
      <div className="w-full max-w-5xl">
        <EmergencyFundEdit />
      </div>
    </div>
  );
} 