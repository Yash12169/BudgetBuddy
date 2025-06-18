import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { financialAtom } from "@/atoms/atoms";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface EmergencyFundStatus {
  monthsCovered: number;
  status: string;
  message: string;
  score: number;
  recommendedMin: number;
  recommendedIdeal: number;
}

interface EmergencyFundData {
  emergencyFundStatus?: EmergencyFundStatus;
  [key: string]: unknown;
}

export default function EmergencyFundEdit() {
  const { user } = useUser();
  const [financials] = useAtom(financialAtom);
  const [monthsCovered, setMonthsCovered] = useState(3); // Default to 3 months
  const [isEditing, setIsEditing] = useState(false);
  const [emergencyFundData, setEmergencyFundData] = useState<EmergencyFundData | null>(null);

  // Fetch emergency fund data
  const fetchEmergencyFundData = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`/api/emergency-fund/${user.id}`);
      if (response.data.success) {
        setEmergencyFundData(response.data);
        if (response.data.emergencyFundStatus?.monthsCovered) {
          setMonthsCovered(response.data.emergencyFundStatus.monthsCovered);
        }
      }
    } catch (error) {
      console.error("Error fetching emergency fund data:", error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchEmergencyFundData();
    }
  }, [user, fetchEmergencyFundData]);

  const handleSave = async () => {
    if (!user || !financials?.allData?.salary) return;

    try {
      // Calculate emergency fund amount based on months covered
      const emergencyFundAmount = (financials.allData.salary * monthsCovered) / 12;
      
      const response = await axios.put(`/api/emergency-fund/${user.id}`, {
        emergencyFund: emergencyFundAmount,
      });

      if (response.data.success) {
        setEmergencyFundData(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating emergency fund:", error);
    }
  };

  // Show loading state while financials is null
  if (!financials) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Emergency Fund</h3>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const currentMonthsCovered = emergencyFundData?.emergencyFundStatus?.monthsCovered || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Emergency Fund</h3>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="months">Months of Expenses to Cover</Label>
            <Input
              id="months"
              type="number"
              min="1"
              max="12"
              value={monthsCovered}
              onChange={(e) => setMonthsCovered(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setMonthsCovered(currentMonthsCovered || 3);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Target: {monthsCovered} months of expenses
          </p>
          <p className="text-sm text-muted-foreground">
            Current: {currentMonthsCovered.toFixed(1)} months
          </p>
        </div>
      )}
    </div>
  );
} 