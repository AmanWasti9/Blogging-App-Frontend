import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { getCurrentUserDetail, isLoggedIn } from "../Auth/Auth";

export default function UserProvider({ children }) {
    const [user, setUser] = useState({
        data:{},
        login:false
      });
     
      useEffect(() => {
        setUser({
          data:getCurrentUserDetail(),
          login:isLoggedIn()
        })
      
      }, []);
      


  return (
  <UserContext.Provider value={{user,setUser}}>
    {children}
</UserContext.Provider>
  )
}
