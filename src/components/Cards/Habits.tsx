"use client";
import Image from "next/image";
import card from "../../assets/fincheckcard.svg";
import GreenBadge from "../ui/greenBadge";
import { montserrat, poppins } from "@/fonts/fonts";
import axios from 'axios'
import { useEffect, useState } from "react";
export default function Habits() {
  const [salary,setSalary] = useState("")
  const [savings,setSavings] = useState("")
  const [expenses,setExpenses] = useState()
  // useEffect(()=>{
  //   const fetchData = async () => {
    
  //     const data = await axios.post("/api/fetch-financials")
  //     setSalary(data.data.data.salary)
  //     setSavings(data.data.data.savingsPercent)
  //     setExpenses(100-parseInt(data.data.data.savingsPercent))
  //   }
  //   fetchData()
    
  // })

  return (
    <div className="flex flex-col p-5 gap-9">
      <div className="flex flex-col items-center gap-5">
      <div className="p-5 rounded-full bg-gray-200">
          <Image src={card} alt={"card"} />
        </div>
        <div className={`${montserrat} text-xl font-semibold`}>
          <p>Spending Habit</p>
        </div>
        
      </div>

      <div className="flex justify-between">

        <div className={`${poppins} flex flex-col gap-5`}>
          <div  className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Monthly Income:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>{salary}</p>
            </div>
          </div>

          <div  className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Expenses:</p>
            </div>
            <div  className="font-semibold text-lg">
              <p>{expenses}%</p>
            </div>
          </div>
        </div>

        <div className={`${poppins} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Savings:</p>
            </div>
            <div  className="font-semibold text-lg">
              <p>{savings}%</p>
            </div>
          </div>

          <div  className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Habit:</p>
            </div>
            <div>
              <GreenBadge text="Saver" />
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
                <p className={`${poppins} font-semibold text-sm`}>Re-Check</p>
            </div>
        </div>
      </div>
    </div>
  );
}
