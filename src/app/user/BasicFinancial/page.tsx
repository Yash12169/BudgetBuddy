"use client"
import { useRouter } from "next/router"
import axios from 'axios'
export default function BasicFinancialForm() {
    const router = useRouter()
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => { 
        const formData = new FormData(e.currentTarget)
        

        const response = await axios.post("/api/finance",{formData})



        const res = await fetch("/api/finance",{
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData.entries())),
            headers: {"Content-Type": "application/json"}
        })
        if(res.json) router.push("/user/dashboard")
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="salary" />
            <input type="text" placeholder="basic expenses" name="" id="" />
            <input type="text" placeholder="insurance" />
            <input type="text" placeholder="emi's"/>
            <input type="text" placeholder="extra expenses" name="" id="" />
            <button type="submit">
                submit
            </button>
        </form> 
    </div>
  )
}
