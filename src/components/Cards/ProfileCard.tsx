"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { montserrat, poppins } from "@/fonts/fonts";
import { financialAtom, emergencyFundAtom, debtAtom, userAtom } from "@/atoms/atoms";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        <div className="bg-neutral text-neutral-content border border-neutral-content/20 rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-neutral-content/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <div className="skeleton w-8 h-8 rounded"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="skeleton h-8 w-48"></div>
                  <div className="skeleton h-4 w-64"></div>
                </div>
              </div>
              <div className="skeleton h-10 w-32 rounded-xl"></div>
            </div>
          </div>

          <div className="p-6 space-y-12">
            <div className="animate-pulse">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <div className="skeleton h-6 w-40"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-14 rounded-xl"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-14 rounded-xl"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-success rounded-full"></div>
                  <div className="skeleton h-6 w-40"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="space-y-3">
                      <div className="skeleton h-4 w-24"></div>
                      <div className="skeleton h-14 rounded-xl"></div>
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
      <div className="bg-neutral text-neutral-content border border-neutral-content/20 rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-neutral-content/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-base-content/10 text-base-content">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" className="text-neutral-content"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor" className="text-neutral-content"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className={`text-2xl font-semibold text-neutral-content ${montserrat}`}>
                  Profile Information
                </h1>
                <p className={`text-sm text-neutral-content/70 ${poppins}`}>
                  Manage your personal and financial details
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={`${montserrat} font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300 ${
                isEditing 
                  ? "border-neutral-content/20 text-neutral hover:bg-neutral-content/60 bg-neutral-content" 
                  : "bg-neutral-content text-neutral hover:bg-neutral-content/60"
              }`}
              disabled={isLoading}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl" role="alert">
            <span className="block sm:inline text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-warning rounded-full"></div>
              <h2 className={`text-lg font-semibold text-neutral-content ${montserrat}`}>Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-content font-semibold text-base`}>First Name</Label>
                <Input
                  type="text"
                  value={formValues.firstName}
                  onChange={handleInputChange("firstName")}
                  disabled={!isEditing || isLoading}
                  customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                  className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 ${
                    !isEditing ? 'bg-neutral-focus/50 text-neutral-content border-neutral-content/10' : 'bg-neutral-focus'
                  }`}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-content font-semibold text-base`}>Last Name</Label>
                <Input
                  type="text"
                  value={formValues.lastName}
                  onChange={handleInputChange("lastName")}
                  disabled={!isEditing || isLoading}
                  customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                  className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 ${
                    !isEditing ? 'bg-neutral-focus/50 text-neutral-content border-neutral-content/10' : 'bg-neutral-focus'
                  }`}
                  placeholder="Enter last name"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-success rounded-full"></div>
              <h2 className={`text-lg font-semibold text-neutral-content ${montserrat}`}>Financial Information</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-content font-semibold text-base`}>Monthly Salary</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-content/70">₹</span>
                  <Input
                    type="text"
                    value={formValues.salary}
                    onChange={handleInputChange("salary")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-focus/50 text-neutral-content border-neutral-content/10' : 'bg-neutral-focus'
                    }`}
                    placeholder="Enter monthly salary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-content font-semibold text-base`}>Monthly Expenses</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-content/70">₹</span>
                  <Input
                    type="text"
                    value={formValues.monthlyExpenses}
                    onChange={handleInputChange("monthlyExpenses")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-focus/50 text-neutral-content border-neutral-content/10' : 'bg-neutral-focus'
                    }`}
                    placeholder="Enter monthly expenses"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-content font-semibold text-base`}>Annual Increment Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-content/70">%</span>
                  <Input
                    type="text"
                    value={formValues.annualIncrementRate}
                    onChange={handleInputChange("annualIncrementRate")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-content/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-focus/50 text-neutral-content/70 border-neutral-content/10' : 'bg-neutral-focus'
                    }`}
                    placeholder="Enter annual increment rate"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-content font-semibold text-base`}>Emergency Fund</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-content/70">₹</span>
                  <Input
                    type="text"
                    value={formValues.emergencyFund}
                    onChange={handleInputChange("emergencyFund")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-content/20 focus:border-success focus:ring-2 focus:ring-success/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-focus/50 text-neutral-content border-neutral-content/10' : 'bg-neutral-focus'
                    }`}
                    placeholder="Enter emergency fund amount"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={`${poppins} text-neutral-content font-semibold text-base`}>Total Debt</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-content/70">₹</span>
                  <Input
                    type="text"
                    value={formValues.debt}
                    onChange={handleInputChange("debt")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-content/20 focus:border-error focus:ring-2 focus:ring-error/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-focus/50 text-neutral-content border-neutral-content/10' : 'bg-neutral-focus'
                    }`}
                    placeholder="Enter total debt"
                  />
                </div>
              </div>
              <div className="space-y-2">
              <Label className={`${poppins} text-neutral-content font-semibold text-base`}>Net Worth</Label>
              <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 font-semibold text-base text-neutral-content/70">₹</span>
                  <Input
                    type="text"
                    value={formValues.netWorth}
                    onChange={handleInputChange("netWorth")}
                    disabled={!isEditing || isLoading}
                    customDisabledCursor={!isEditing ? "disabled:cursor-default" : undefined}
                    className={`${montserrat} text-base border border-neutral-content/20 focus:border-success focus:ring-2 focus:ring-success/20 transition-all duration-300 rounded-xl bg-neutral-focus text-neutral-content font-semibold p-3 pl-8 ${
                      !isEditing ? 'bg-neutral-focus/50 text-neutral-content border-neutral-content/10' : 'bg-neutral-focus'
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
                className={`border-neutral-content/20 text-neutral-content hover:bg-neutral-focus hover:text-neutral-content bg-transparent ${montserrat} font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300`}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className={`bg-neutral-content text-neutral hover:bg-neutral-content/60 border-neutral-content ${montserrat} font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300`}
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