"use client";
import { debtAtom, emergencyFundAtom, financialAtom, goalAtom, userAtom } from "@/atoms/atoms";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect } from "react";
export default function UserProvider({ children }) {
  const userC = useUser();
  const [user, setUser] = useAtom(userAtom);
  const [financial,setFinancial] = useAtom(financialAtom);
  const [emergencyFund,setEmergencyFund] = useAtom(emergencyFundAtom)
  const [debt,setDebt] = useAtom(debtAtom);
  const [goal,setGoal] = useAtom(goalAtom)
  const id = userC.user?.id;

  useEffect(() => {
    const fetchGoalData = async()=>{
      try{
        const data = await axios.get(`/api/goals/${id}`)
        console.log("yeh hai goal",data)
      }
      catch(error){
        console.log(error)
      }
    }
    
    const fetchUserData = async () => {
      try {
        const data = await axios.get(`/api/fetch-user/${id}`);
        setUser({ ...data.data.user });
      } catch (error) {
        console.log(error);
      }
    };
    const fetchFinancials = async () => {
      try{
        const response = await axios.get(`/api/fetch-financials/${id}`)
        setFinancial(response.data)
      }
      catch(error){
        console.log(error)
      }
    }
    const fetchEmergencyFund = async ()=>{
      try{
         const response = await axios.get(`/api/emergency-fund/${id}`)
         setEmergencyFund(response.data);

      }
      catch(error){
        console.log(error)
      }
    }
    const fetchDebt = async ()=>{
      try{
         const response = await axios.get(`/api/debt/${id}`)
         setDebt(response.data);

      }
      catch(error){
        console.log(error)
      }
    }
    fetchEmergencyFund();
    fetchFinancials();
    fetchUserData();
    fetchGoalData();
    fetchDebt();
  }, [id]);
  return <>{children}</>;
}
