"use client";
import WealthHoverCard from "../ui/WealthHoverCard";
import CarHoverCard from "../ui/CarHoverCard";
import HouseHoverCard from "../ui/HouseHoverCard";
import RetirementHoverCard from "../ui/RetirementHoverCard";
import { montserrat } from "@/fonts/fonts";

export default function Goals() {
  return (
    <div className="flex flex-col bg-neutral text-neutral-content shadow-lg rounded-2xl p-7 gap-5 md:gap-7 border border-neutral-content/20">
      <div className="flex flex-col w-full h-full gap-5 md:gap-7 ">
        <div className="flex flex-col">
          <div className="text-xl text-neutral-content font-semibold">
            <p className={`${montserrat}`}>Create Goals</p>
          </div>
          <div className="text-sm text-neutral-content/80">
            <p className={`${montserrat}`}>Create a goal to help you stay on track and achieve your financial goals.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:flex md:justify-around md:gap-0 w-full">
          <WealthHoverCard />
          <CarHoverCard />
          <HouseHoverCard />
          <RetirementHoverCard />
        </div>
      </div>
    </div>
  );
}
