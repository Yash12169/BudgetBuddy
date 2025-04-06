"use client";
import Image from "next/image";
import card from "../../assets/dash-debt-tool.svg";
import { Badge } from "../ui/badge";
import { Montserrat, Poppins } from "next/font/google"; // Changed import
import { useEffect, useState } from "react";


const montserrat = Montserrat({ subsets: ["latin"], weight: ["600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

type StatusDetails = {
  text: string;
  color: string;
};

export default function EmergencyFund() {
  const [salary, setSalary] = useState<number>(0);
  const [emergencyFund, setEmergencyFund] = useState<number>(0);
  const [statusDetails, setStatusDetails] = useState<StatusDetails>({ 
    text: "Loading...", 
    color: "bg-gray-500" 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/emergency-fund");
        const data = await response.json();
        
        setSalary(data.salary || 0);
        setEmergencyFund(data.emergencyFund || 0);
        
        const monthsCovered = data.emergencyFund / data.salary;
        let newStatus: StatusDetails;
        
        if (monthsCovered <= 0) {
          newStatus = { text: "Critical", color: "bg-red-500" };
        } else if (monthsCovered < 1) {
          newStatus = { text: "Danger", color: "bg-red-400" };
        } else if (monthsCovered < 3) {
          newStatus = { text: "Warning", color: "bg-yellow-500" };
        } else if (monthsCovered < 6) {
          newStatus = { text: "Moderate", color: "bg-blue-500" };
        } else {
          newStatus = { text: "Secure", color: "bg-green-500" };
        }
        
        setStatusDetails(newStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-5 h-[45vh] justify-between text-black">
      <div className="flex flex-col items-center gap-5">
        <div className="p-5 rounded-full bg-gray-200">
          <Image src={card} alt="Emergency Fund" width={60} height={60} />
        </div>
        <div className={`${montserrat.className} text-xl font-semibold`}>
          <p>Emergency Fund</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className={`${poppins.className} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Monthly Salary</p>
            </div>
            <div className="font-semibold text-lg">
              <p>₹{salary.toLocaleString()}</p>
            </div>
          </div>

          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Emergency Fund:</p>
            </div>
            <div className="font-semibold text-lg">
              <p>₹{emergencyFund.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className={`${poppins.className} flex flex-col gap-5`}>
          <div className="gap-1 flex flex-col">
            <div className="text-sm text-[#36454F]">
              <p>Your Status:</p>
            </div>
            <div>
              <Badge className={statusDetails.color}>
                {statusDetails.text}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-[#c9cac88b] rounded-full h-[1px] w-full"></div>
        <div className="flex justify-between">
          <div className="bg-black text-white rounded-[30px] px-5 py-1 cursor-pointer flex justify-center items-center">
            <p className={`${poppins.className} font-semibold text-sm`}>View</p>
          </div>
          <div className="flex justify-center items-center border-2 border-black hover:bg-black hover:text-white transition duration-300 text-black rounded-[30px] px-5 py-1 cursor-pointer">
            <p className={`${poppins.className} font-semibold text-sm`}>Re-Check</p>
          </div>
        </div>
      </div>
    </div>
  );
}