  "use client";
  import { userAtom } from "@/atoms/atoms";
import { useUser } from "@clerk/nextjs";
  import axios from "axios";
  import { useAtom } from "jotai";
  import { useEffect } from "react";
  export default function UserProvider({ children}) {
    const userC = useUser()
    console.log("clerk",userC.user?.imageUrl)
    const [user, setUser] = useAtom(userAtom);
    const id = userC.user?.id;
    console.log(id)
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const data = await axios.get(`/api/fetch-user/${id}`);
          const finData = await axios.get(`/api/fetch-financials/${id}`);
          console.log(finData)
          console.log(data);
          setUser({...data.data.user});
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserData();
    }, [id]);

    return <>{children}</>;
  }
