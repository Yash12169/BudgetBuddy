"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { montserrat, poppins, bricolage_grotesque } from "@/fonts/fonts";
import { financialAtom, emergencyFundAtom, debtAtom, userAtom } from "@/atoms/atoms";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const formatNumber = (value: string | number): string => {
  const str = value.toString().replace(/,/g, "");
  if (str === "" || isNaN(Number(str))) return "";
  const [whole, decimal] = str.split(".");
  const lastThree = whole.slice(-3);
  const other = whole.slice(0, -3);
  const formatted =
    other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (other ? "," : "") +
    lastThree;
  return decimal ? `${formatted}.${decimal}` : formatted;
};

const parseNumber = (value: string): number => {
  const clean = value.replace(/,/g, "");
  return isNaN(Number(clean)) ? 0 : Number(clean);
};

export default function ProfileCard() {
  const [financials, setFinancials] = useAtom(financialAtom);
  const [emergencyFund, setEmergencyFund] = useAtom(emergencyFundAtom);
  const [debt, setDebt] = useAtom(debtAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useAtom(userAtom);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    salary: "",
    monthlyExpenses: "",
    annualIncrementRate: "",
    emergencyFund: "",
    debt: "",
    netWorth: "",
  });

  const maxLimits = {
    salary: 1000000000,
    monthlyExpenses: 10000000,
    annualIncrementRate: 100,
    emergencyFund: 1000000000,
    debt: 1000000000,
    netWorth: 1000000000,
  };

  useEffect(() => {
    if (financials?.allData) {
      setFormValues({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        salary: financials.allData.salary ? formatNumber(financials.allData.salary) : "",
        monthlyExpenses: financials.allData.expenses ? formatNumber(financials.allData.expenses) : "",
        annualIncrementRate: financials.allData.annualIncrementRate ? financials.allData.annualIncrementRate.toFixed(1) : "",
        emergencyFund: emergencyFund?.data?.emergencyFund ? formatNumber(emergencyFund.data.emergencyFund) : "0",
        debt: debt?.data?.data?.loanAmount ? formatNumber(debt.data.data.loanAmount) : "0",
        netWorth: financials.allData.netWorth ? formatNumber(financials.allData.netWorth) : "0",
      });
    }
  }, [financials, emergencyFund, debt, user]);

  useEffect(() => {
    if (user) {
      setFormValues(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      }));
    }
  }, [user]);

  const handleInputChange = (field: keyof typeof formValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (['salary', 'monthlyExpenses', 'emergencyFund', 'debt', 'netWorth'].includes(field)) {
      const rawValue = value.replace(/,/g, "");
      
      if (/^\d*\.?\d*$/.test(rawValue)) {
        const num = Number(rawValue);
        if (num > maxLimits[field as keyof typeof maxLimits]) return;
        
        setFormValues(prev => ({
          ...prev,
          [field]: formatNumber(num),
        }));
      }
    } else if (field === 'annualIncrementRate') {
      const numValue = parseFloat(value);
      if (numValue > maxLimits.annualIncrementRate) return;
      
      setFormValues(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      setError("User not authenticated");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update user name if changed
      const currentFirstName = user.firstName || "";
      const currentLastName = user.lastName || "";
      
      if (formValues.firstName !== currentFirstName || formValues.lastName !== currentLastName) {
        console.log('Updating user name:', { firstName: formValues.firstName, lastName: formValues.lastName });
        const userResponse = await axios.put(`/api/fetch-user/${user.id}`, {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
        });
        console.log('User response:', userResponse.data);
        setUser(userResponse.data.user);
      }

      const financialData = {
        userId: user.id,
        salary: parseNumber(formValues.salary),
        expenses: parseNumber(formValues.monthlyExpenses),
        annualIncrementRate: parseFloat(formValues.annualIncrementRate),
        netWorth: parseNumber(formValues.netWorth),
      };
      
      console.log('Saving financial data:', financialData);
      
      // Update financials
      const financialResponse = await axios.put(`/api/financials/${user.id}`, financialData);
      console.log('Financial response:', financialResponse.data);
      setFinancials(financialResponse.data);

      const currentEmergencyFund = emergencyFund?.data?.emergencyFund || 0;
      const newEmergencyFund = parseNumber(formValues.emergencyFund);
      
      if (newEmergencyFund !== currentEmergencyFund) {
        console.log('Updating emergency fund:', newEmergencyFund);
        const emergencyResponse = await axios.put(`/api/emergency-fund/${user.id}`, {
          emergencyFund: newEmergencyFund,
        });
        console.log('Emergency fund response:', emergencyResponse.data);
        setEmergencyFund(emergencyResponse.data);
      }

      const currentDebt = debt?.data?.data?.loanAmount || 0;
      const newDebt = parseNumber(formValues.debt);
      
      if (newDebt !== currentDebt) {
        console.log('Updating debt:', newDebt);
        const debtResponse = await axios.put(`/api/debt/${user.id}`, {
          loanAmount: newDebt,
          loanTenure: debt?.data?.data?.loanTenure || 12,
          emiAmount: debt?.data?.data?.emiAmount || 0,
        });
        console.log('Debt response:', debtResponse.data);
        setDebt(debtResponse.data);
      }
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (financials?.allData) {
      setFormValues({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        salary: financials.allData.salary ? formatNumber(financials.allData.salary) : "",
        monthlyExpenses: financials.allData.expenses ? formatNumber(financials.allData.expenses) : "",
        annualIncrementRate: financials.allData.annualIncrementRate ? financials.allData.annualIncrementRate.toFixed(1) : "",
        emergencyFund: emergencyFund?.data?.emergencyFund ? formatNumber(emergencyFund.data.emergencyFund) : "0",
        debt: debt?.data?.data?.loanAmount ? formatNumber(debt.data.data.loanAmount) : "0",
        netWorth: financials.allData.netWorth ? formatNumber(financials.allData.netWorth) : "0",
      });
    }
    setIsEditing(false);
    setError(null);
  };

  if (!financials || !user) {
    return (
      <div className="w-full max-w-8xl mx-auto">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
          {/* Header Skeleton */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-48"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-64"></div>
                </div>
              </div>
              <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-12">
            <div className="animate-pulse">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-40"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
                    <div className="h-14 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20"></div>
                    <div className="h-14 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Financial Information Section */}
              <div className="space-y-6 mt-12">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-40"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="space-y-3">
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24"></div>
                      <div className="h-14 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-neutral-200 dark:border-neutral-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#3B82F6"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#3B82F6"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className={`text-2xl font-semibold text-neutral-800 dark:text-neutral-100 ${montserrat}`}>
                  Profile Information
                </h1>
                <p className={`text-sm text-neutral-600 dark:text-neutral-300 ${poppins}`}>
                  Manage your personal and financial details
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={`${montserrat} font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                isEditing 
                  ? "border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg" role="alert">
            <span className="block sm:inline text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className={`text-lg font-semibold text-neutral-800 dark:text-neutral-100 ${montserrat}`}>Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>First Name</Label>
                <Input
                  type="text"
                  value={formValues.firstName}
                  onChange={handleInputChange("firstName")}
                  disabled={!isEditing || isLoading}
                  customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                  className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 ${
                    !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                  }`}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>Last Name</Label>
                <Input
                  type="text"
                  value={formValues.lastName}
                  onChange={handleInputChange("lastName")}
                  disabled={!isEditing || isLoading}
                  customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                  className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 ${
                    !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                  }`}
                  placeholder="Enter last name"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              <h2 className={`text-lg font-semibold text-neutral-800 dark:text-neutral-100 ${montserrat}`}>Financial Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>Monthly Salary</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-700">₹</span>
                  <Input
                    type="text"
                    value={formValues.salary}
                    onChange={handleInputChange("salary")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                    }`}
                    placeholder="Enter monthly salary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>Monthly Expenses</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-700">₹</span>
                  <Input
                    type="text"
                    value={formValues.monthlyExpenses}
                    onChange={handleInputChange("monthlyExpenses")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                    }`}
                    placeholder="Enter monthly expenses"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>Annual Increment Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-700">%</span>
                  <Input
                    type="text"
                    value={formValues.annualIncrementRate}
                    onChange={handleInputChange("annualIncrementRate")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                    }`}
                    placeholder="Enter annual increment rate"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>Emergency Fund</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-green-600">₹</span>
                  <Input
                    type="text"
                    value={formValues.emergencyFund}
                    onChange={handleInputChange("emergencyFund")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                    }`}
                    placeholder="Enter emergency fund amount"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>Total Debt</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-red-600">₹</span>
                  <Input
                    type="text"
                    value={formValues.debt}
                    onChange={handleInputChange("debt")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                    }`}
                    placeholder="Enter total debt"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-900 dark:text-neutral-100 font-semibold text-base`}>Net Worth</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-emerald-600">₹</span>
                  <Input
                    type="text"
                    value={formValues.netWorth}
                    onChange={handleInputChange("netWorth")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 rounded-lg bg-white dark:bg-neutral-800 font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-neutral-100 dark:border-neutral-700' : 'bg-white dark:bg-neutral-800'
                    }`}
                    placeholder="Enter net worth"
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 pt-6 justify-center">
              <Button
                onClick={handleCancel}
                variant="outline"
                className={`${montserrat} font-semibold text-sm px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300`}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className={`bg-blue-500 hover:bg-blue-600 text-white ${montserrat} font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-300`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 