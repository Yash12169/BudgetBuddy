import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { financialAtom } from "@/atoms/atoms";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function EmergencyFundEdit() {
  const { user } = useUser();
  const [financials, setFinancials] = useAtom(financialAtom);
  const [monthsCovered, setMonthsCovered] = useState(3); // Default to 3 months
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Update monthsCovered when financials data is loaded
  useEffect(() => {
    if (financials?.monthsCovered) {
      setMonthsCovered(financials.monthsCovered);
    }
  }, [financials]);

  const handleSave = async () => {
    if (!user) return;

    try {
      const response = await axios.put(`/api/financial/${user.id}`, {
        monthsCovered: monthsCovered,
      });

      setFinancials(response.data);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Emergency fund months updated successfully",
      });
    } catch (error) {
      console.error("Error updating emergency fund:", error);
      toast({
        title: "Error",
        description: "Failed to update emergency fund months",
        variant: "destructive",
      });
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
                setMonthsCovered(financials.monthsCovered || 3);
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
            Current: {financials.currentEmergencyFund || 0} months
          </p>
        </div>
      )}
    </div>
  );
} 