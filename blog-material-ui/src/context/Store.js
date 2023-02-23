import React, { createContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';


export let AuthContext= createContext(0);



 const AuthContextProvider = (props) => {

    let [Userdata,setdataUser] = useState(null)

    let SaveUserData=()=>{

        let encodedToken = localStorage.getItem("token")
      
        let decodedToken = jwtDecode(encodedToken)
      
        setdataUser(decodedToken)
      
      
      }

      let LogOut= ()=>{

        localStorage.removeItem("token")
        setdataUser(null)
        return <Navigate to="/login"/>
      }
      
      useEffect(() => {
        if(localStorage.getItem("token")){
          SaveUserData();
      
        }
       
      }, [])
      
  return <AuthContext.Provider value={{Userdata,SaveUserData,LogOut}}>

          {props.children}

         </AuthContext.Provider>
}

export default AuthContextProvider;
