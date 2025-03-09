"use client";
import Image from "next/image";
import img from "../../assets/profile-icon.svg";
import { montserrat, poppins } from "@/fonts/fonts";
import RedBadge from "../ui/redBadge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/atoms";
export default function StarterCard() {
  const [user] = useAtom(userAtom);

  if (user) {
    console.log("fin shit:", user.financial);
  }

  if (!user || !user.financial) {
    return (
      <div className="flex gap-4 flex-col w-[100%] h-[100%] px-5 py-5 bg-neutral text-neutral-content rounded-[30px]">
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
    
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-4 flex-col w-[100%] h-[100%] px-5 py-5 bg-neutral text-neutral-content rounded-[30px]">
      <div className="bg--500 flex flex-col text-center items-center gap-4">
        <div
          className="rounded-full flex justify-center items-end bg--500 w-[25%]"
          style={{
            backgroundImage:
              "conic-gradient(from -135deg, #EC0072 0deg, #6C2DFF 60deg, #1B92FF 135deg, #00F1BA 270deg, transparent 270deg, transparent 360deg)",
          }}
        >
          <Image src={img} alt="icon" className="rounded-full mt-5" />
        </div>
        <div>
          <p className={`${montserrat} `}>
            <span className="font-semibold">Hi</span>, {user.firstName}
          </p>
        </div>
      </div>

      <div className={`flex justify-between ${poppins}`}>
        <div className="flex flex-col gap-1">
          <div>
            <p>Your net Worth</p>
          </div>
          <div>
            <p>₹ {user.financial.salary}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <p>Your financial Health</p>
          </div>
          <div>
            <RedBadge text="Weak" />
          </div>
        </div>
      </div>
    </div>
  );
}
