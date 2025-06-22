"use client";
import WealthHoverCard from "../ui/WealthHoverCard";
import CarHoverCard from "../ui/CarHoverCard";
import HouseHoverCard from "../ui/HouseHoverCard";
import RetirementHoverCard from "../ui/RetirementHoverCard";
import { montserrat } from "@/fonts/fonts";

export default function Goals() {
  return (
    <div className="flex flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-7 gap-5 md:gap-7">
      <div className="flex flex-col w-full h-full gap-5 md:gap-7 ">
        <div className="flex flex-col">
          <div className=" text-xl text-black font-semibold">
            <p className={`${montserrat}`}>Create Goals</p>
          </div>
          <div className="text-sm ">
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
      {/* <div className="flex flex-row items-center justify-between w-full border-t border-[#5a595947] pt-2 mt-2">
        <div className="flex gap-2 items-center">
          <Image src={img2} alt="icon" width={20} height={20} />
          <p className={`${poppins} text-[13px] w-full`}>
            <span className="font-semibold">Reminder!</span> Recheck your financial health regularly to track improvements.
          </p>
        </div>
        <div className="flex justify-center items-center text-secondary cursor-pointer w-[10%] h-[75%]  rounded-full bg-neutral hover:bg-neutral-200 transition">
          <p className={`text-[12px] font-semibold ${poppins}`} onClick={() => router.push("/user/goals")}> 
            Create Goals
          </p>
        </div> */}
      {/* </div> */}
    </div>
  );
}
