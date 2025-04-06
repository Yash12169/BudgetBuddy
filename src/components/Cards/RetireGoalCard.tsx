"use client";
import Image from "next/image";
import retire from '../../assets/dash-retire-goal.svg'
import { montserrat, poppins } from "@/fonts/fonts";
export default function RetireGoalCard() {

  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between text-black">
      <div className="flex flex-col items-center gap-5">
        <div className="p-3">
          <Image src={retire} width={36} height={36} alt={"card"} />
        </div>
        <div className={`${montserrat} text-xl font-semibold`}>
          <p>Retirement</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Amount:</p>
            </div>
            <div className="font-semibold text-lg">
              <p></p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
          <div className="text-sm text-[#36454F]">
              <p>Amount Required in 2034:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>%</p>
            </div>
            
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
          <div className="text-sm text-[#36454F]">
              <p>Target Year:</p>
            </div>
            <div className="font-semibold text-lg">
              <p></p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Goal Possiblity:</p>
            </div>
            <div>
                Possible
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-[#c9cac88b] rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
          <div className="bg-black text-white rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center">
            <p className={`${[poppins]} font-semibold text-sm`}>View</p>
          </div>
          <div className="flex justify-center items-center border-2  border-black hover:bg-black hover:text-white transition duration-300 text-black rounded-[30px] px-5 py-1 cursor-pointer">
            <p className={`${poppins} font-semibold text-sm`}>Modify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
