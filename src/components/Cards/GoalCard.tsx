"use client";
import Image from "next/image";
import card from "../../assets/fincheckcard.svg";
import GreenBadge from "../ui/greenBadge";
import { montserrat, poppins } from "@/fonts/fonts";

interface GoalCardProps {
  title: string;
  expenses: number;
  savings: number;
  habit: string;
}

export default function GoalCard({ title, expenses, savings, habit }: GoalCardProps) {
  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between bg-neutral text-neutral-content rounded-xl">
      <div className="flex flex-col items-center gap-5">
        <div className="p-5 rounded-full bg-neutral-focus">
          <Image src={card} alt="card" />
        </div>
        <div className={`${montserrat} text-xl font-semibold text-neutral-content`}>
          <p>{title}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Monthly Income:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p></p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Expenses:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{expenses}%</p>
            </div>
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Savings:</p>
            </div>
            <div className="font-semibold text-lg text-neutral-content">
              <p>{savings}%</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-neutral-content/70">
              <p>Habit:</p>
            </div>
            <div>
              <GreenBadge text={habit} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-neutral-content/20 rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
          <div className="bg-neutral-content text-neutral rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center hover:bg-neutral-content/90 transition-all duration-300">
            <p className={`${poppins} font-semibold text-sm`}>View</p>
          </div>
          <div className="flex justify-center items-center border-2 border-neutral-content hover:bg-neutral-content hover:text-neutral transition duration-300 text-neutral-content rounded-[30px] px-5 py-1 cursor-pointer">
            <p className={`${poppins} font-semibold text-sm`}>Modify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
