"use client";
import Image from "next/image";
import img from "../../assets/dummy-person.jpg";
import { montserrat, poppins } from "@/fonts/fonts";
import RedBadge from "../ui/redBadge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/atoms";
import { useUser } from "@clerk/nextjs";
export default function StarterCard() {
  const userC = useUser()
  const [user] = useAtom(userAtom);
  const [userImg,setUserImg] = useState("");
  useEffect(()=>{
    if(userC.isLoaded){
      setUserImg(userC.user?.imageUrl)
    }
  },[userC.isLoaded,userC.user?.imageUrl])

  if (!user || !user.financial) {
    return (
      <div className="flex gap-4 flex-col h-[100%] px-5 py-9 bg-neutral text-neutral-content rounded-[30px]">
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
    <div className="bg-gradient-to-br from-gray-800 to-black flex gap-4 flex-col w-[100%] h-[100%] px-5 py-5 text-neutral-content rounded-[30px]">
      <div className="bg--500 flex flex-col text-center items-center gap-4">
        <div className="rounded-full h-36  p-2 w-36 flex justify-center  border-4 border-purple-500 shadow-[0_0_15px_#A020F0]">
          <Image
            src={userImg}
            draggable={false}
            width={144}
            height={144}
            alt="icon"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-white">
          <p className={`${montserrat} `}>
            <span className="font-semibold text-lg">Hi</span>,  <span className="text-gray-300"> {userC.user?.firstName}</span>
          </p>
        </div>
      </div>

      <div className={`flex justify-between ${poppins}`}>
        <div className="flex flex-col gap-1">
          <div className="text-sm">
            <p>Your net Worth</p>
          </div>
          <div className="font-semibold text-lg text-white">
            <p>₹ 69000</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm">
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
