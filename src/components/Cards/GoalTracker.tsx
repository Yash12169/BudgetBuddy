"use client";
import Image from "next/image";
import house from "../../assets/dash-house-goal.svg"
import car from "../../assets/dash-car-goal.svg"

import tracker from '../../assets/dash-goal-tracker.svg'
import { montserrat, poppins } from "@/fonts/fonts";
import RedBadge from "../ui/redBadge";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/atoms";
import { useUser } from "@clerk/nextjs";
import StackedChart from "../ui/StackedChart";
export default function GoalTracker() {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-black flex gap-4 flex-col w-[100%] h-[100%] px-7 py-8 text-neutral-content rounded-[30px]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <div>
                <Image src={tracker} height={36} width={36} alt="tracker"/>
            </div>
        <div className=" text-xl text-white font-semibold">
          <p className={`${montserrat}`}>Top Goals</p>
        </div>
        </div>
        <div className="text-sm ">
          <p className={`${montserrat}`}>
            A summary of your Top Goals and possibility
          </p>
        </div>
      </div>

      <div className="flex border justify-between rounded-[15px] px-5 py-3">
        <div className="flex gap-3">
            <div className="flex justify-center">
                <Image src={house} alt="house"/>
            </div>
            <div className="flex flex-col">
                <div className="font-semibold  text-white">
                    <p className={`${montserrat}`}>House</p>
                </div>
                <div className="text-sm">
                    <p>Target to achieve in 2034</p>
                </div>
            </div>
        </div>
        
        <div className="flex text-sm gap-9">
            <div className="flex flex-col">
                <div>
                    <p>Priority</p>
                </div>
                <div>
                    <p className="font-semibold">1</p>
                </div>
            </div>
        <div className={`${montserrat} flex flex-col`}>
                <div>
                    <p>Amount</p>
                </div>
                <div>
                    <p className="font-semibold ">70 Lakh</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    <p>Target Year</p>
                </div>
                <div>
                    <p className="font-semibold">2034</p>
                </div>
            </div>
        </div>

        <div className={`${montserrat} text-sm flex flex-col text-white`}>
            <div>
                <p>Goal Possiblity</p>
            </div>
            <div className="font-semibold text-[#864be4]">
                <p>Possible</p>
            </div>
        </div>

      </div>

      <div className="flex border justify-between rounded-[15px] px-5 py-3">
        <div className="flex gap-3">
            <div className="flex justify-center">
                <Image src={car} alt="house"/>
            </div>
            <div className="flex flex-col">
                <div className="font-semibold  text-white">
                    <p className={`${montserrat}`}>Car</p>
                </div>
                <div className="text-sm">
                    <p>Target to achieve in 2034</p>
                </div>
            </div>
        </div>
        
        <div className="flex text-sm gap-9">
            <div className="flex flex-col">
                <div>
                    <p>Priority</p>
                </div>
                <div>
                    <p className="font-semibold">1</p>
                </div>
            </div>
        <div className={`${montserrat} flex flex-col`}>
                <div>
                    <p>Amount</p>
                </div>
                <div>
                    <p className="font-semibold ">70 Lakh</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div>
                    <p>Target Year</p>
                </div>
                <div>
                    <p className="font-semibold">2034</p>
                </div>
            </div>
        </div>

        <div className={`${montserrat} text-sm flex flex-col text-white`}>
            <div>
                <p>Goal Possiblity</p>
            </div>
            <div className="font-semibold text-[#864be4]">
                <p>Possible</p>
            </div>
        </div>

      </div>


    </div>
  );
}
