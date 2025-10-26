import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
    const isAuthenticated =  JSON.parse(localStorage.getItem("userData"))
    if (isAuthenticated){
        return children
    }
    else{
        return <Navigate to="/login" replace />
    }
  
}
