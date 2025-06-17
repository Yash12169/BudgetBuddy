"use client";
import { debtAtom, emergencyFundAtom, financialAtom, goalAtom, userAtom } from "@/atoms/atoms";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect } from "react";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const userC = useUser();
  const [, setUser] = useAtom(userAtom);
  const [, setFinancial] = useAtom(financialAtom);
  const [, setEmergencyFund] = useAtom(emergencyFundAtom);
  const [, setDebt] = useAtom(debtAtom);
  const [, setGoal] = useAtom(goalAtom);
  const id = userC.user?.id;

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const data = await axios.get(`/api/goals/${id}`);
        setGoal(data.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          // No goals found - this is normal for new users
          setGoal([]); // or null, depending on your data structure
        } else {
          console.error("Error fetching goal data:", error);
        }
      }
    };
    
    const fetchUserData = async () => {
      try {
        const data = await axios.get(`/api/fetch-user/${id}`);
        setUser({ ...data.data.user });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // User data might be critical, so we keep the error logging
      }
    };

    const fetchFinancials = async () => {
      try {
        const response = await axios.get(`/api/financials/${id}`);
        setFinancial(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setFinancial(null); // or appropriate default
        } else {
          console.error("Error fetching financials:", error);
        }
      }
    };

    const fetchEmergencyFund = async () => {
      try {
        const response = await axios.get(`/api/emergency-fund/${id}`);
        setEmergencyFund(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setEmergencyFund(null); // or appropriate default
        } else {
          console.error("Error fetching emergency fund:", error);
        }
      }
    };

    const fetchDebt = async () => {
      try {
        const response = await axios.get(`/api/debt/${id}`);
        setDebt(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setDebt([]); // or null, depending on your data structure
        } else {
          console.error("Error fetching debt:", error);
        }
      }
    };

    if (id) {
      // Using Promise.allSettled to prevent one failure from stopping others
      Promise.allSettled([
        fetchEmergencyFund(),
        fetchFinancials(),
        fetchUserData(),
        fetchGoalData(),
        fetchDebt()
      ]).then((results) => {
        // All requests completed (either resolved or rejected)
        // You can optionally check results if needed
        const failedRequests = results.filter(result => result.status === 'rejected');
        if (failedRequests.length > 0) {
          console.log(`${failedRequests.length} requests failed, but this might be normal for new users`);
        }
      });
    }
  }, [id, setUser, setFinancial, setEmergencyFund, setDebt, setGoal]);

  return <>{children}</>;
}