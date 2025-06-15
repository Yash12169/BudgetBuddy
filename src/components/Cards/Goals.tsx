"use client";
import wallet from "../../assets/investment-score.svg";
import shield from "../../assets/security-score.svg";
import { bricolage_grotesque, montserrat, poppins } from "@/fonts/fonts";
import finWeak from "../../assets/financial-health-icon-weak.svg";
import Image from "next/image";
import img2 from "../../assets/dash-icon-bulb.svg";
import HoverCard from "../ui/HoverCard";
import WealthHoverCard from "../ui/WealthHoverCard";
import CarHoverCard from "../ui/CarHoverCard";
import HouseHoverCard from "../ui/HouseHoverCard";
import RetirementHoverCard from "../ui/RetirementHoverCard";
import { useRouter } from "next/navigation";
export default function Goals() {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-accent text-accent-foreground shadow-lg rounded-[30px] p-7 gap-7">
      <div className="flex flex-col w-[100%] h-[100%] gap-7 ">
        <div className="flex flex-col">
          <div className=" text-xl text-black font-semibold">
            <p className={`${montserrat}`}>Create Goals</p>
          </div>
          <div className="text-sm ">
            <p className={`${montserrat}`}>
              Create a goal to help you stay on track and achieve your financial
              goals.
            </p>
          </div>
        </div>
        <div className="flex w-[100%] justify-around">
          <WealthHoverCard />
          <CarHoverCard />
          <HouseHoverCard />
          <RetirementHoverCard />
        </div>
        <div></div>
      </div>

      <div className="flex flex-col h-[5vh] w-full justify-end items-end gap-7 border-t border-[#5a595947]">
        <div className="flex h-[90%] justify-between items-end w-full px-4">
          <div className="flex gap-3 items-center w-[80%] h-fit">
            <Image src={img2} alt="icon" />
            <p className={`${poppins} text-[13px] w-full`}>
              <span className="font-semibold">Reminder!</span> Recheck your
              financial health regularly to track improvements.
            </p>
          </div>
          <div className="flex justify-center items-center text-secondary cursor-pointer w-[10%] h-[75%]  rounded-full bg-neutral hover:bg-neutral-200 transition">
            <p className={`text-[12px] font-semibold ${poppins}`} onClick={() => router.push("/user/goals")}>
              Create Goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
