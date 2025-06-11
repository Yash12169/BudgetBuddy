"use client"
import { useRouter } from "next/navigation"
import { FormEvent } from 'react'
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    const router = useRouter()
    const { user } = useUser();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        if (!user?.id) {
            console.error("User not authenticated");
            return;
        }

        const formData = new FormData(e.currentTarget)
        const formValues = Object.fromEntries(formData.entries())
        
        try {
            const res = await axios.post(`/api/financials/${user.id}`, formValues, {
                headers: { "Content-Type": "application/json" },
            })            
            router.push("/user/dashboard")
        } catch (error) {
            console.error("Error submitting form:", error)
        }
    }
    
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Financial Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                    <input 
                        type="text" 
                        id="salary"
                        name="salary" 
                        placeholder="Monthly salary" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                
                <div>
                    <label htmlFor="expenses" className="block text-sm font-medium text-gray-700">Basic Expenses</label>
                    <input 
                        type="text" 
                        id="expenses"
                        name="expenses" 
                        placeholder="Rent, utilities, etc." 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                
                <div>
                    <label htmlFor="insurancePremium" className="block text-sm font-medium text-gray-700">Insurance</label>
                    <input 
                        type="text" 
                        id="insurancePremium"
                        name="insurancePremium" 
                        placeholder="Health, car, etc." 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                
                <div>
                    <label htmlFor="extraExpenses" className="block text-sm font-medium text-gray-700">Extra Expenses</label>
                    <input 
                        type="text" 
                        id="extraExpenses"
                        name="extraExpenses" 
                        placeholder="Entertainment, shopping, etc." 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                
                <button 
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form> 
        </div>
    )
}