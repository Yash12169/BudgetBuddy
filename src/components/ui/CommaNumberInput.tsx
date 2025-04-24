'use client';
import { useState } from "react";

export default function CommaNumberInput() {
  const [value, setValue] = useState("");

  const formatNumber = (val: string) => {
    const num = val.replace(/,/g, "");
    if (num === "") return "";
    if (!/^\d+$/.test(num)) return value; // block non-numeric input
    return Number(num).toLocaleString("en-IN");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    setValue(formatNumber(raw));
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Enter number"
      className="border px-3 py-2 rounded-md w-full bg-white"
    />
  );
}
