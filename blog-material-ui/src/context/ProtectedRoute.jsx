import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './Store'

const ProtectedRoute = ({children}) => {

    const {Userdata} = useContext(AuthContext)
if(Userdata == null && localStorage.getItem("token") == null){

    return <Navigate to= "/login"/>
}else{

    return children;
}
}

export default ProtectedRoute