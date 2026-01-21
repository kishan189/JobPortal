import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Navbar from './components/component_lite/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import { ProtectedRoute } from './utils/ProtectedRoute'
import PrivacyPolicy from './components/component_lite/PrivacyPolicy'
import TermsOfService from './components/component_lite/TermOfService'
import { Home } from './pages/Home'
import { Jobs } from './pages/Jobs'
import Browse from './pages/Browse'
import { setUserData } from './redux/authSlice'
import { useDispatch } from 'react-redux'
import Profile from './pages/Profile'
import Description from './pages/Description'
import Companies from './components/adminComponents/Companies'
import CreateCompany from './components/adminComponents/CreateCompany'
import CompanySetup from './components/adminComponents/CompanySetup'

const appRouter = createBrowserRouter([
  {path:"/", element : 
  <ProtectedRoute><Home/></ProtectedRoute>},
  {path:"/login", element : <Login/>},
  {path:"/register", element :<Register/>},
   {path:"/privacy", element :<ProtectedRoute><PrivacyPolicy/></ProtectedRoute> },
   {path:"/terms", element : <ProtectedRoute><TermsOfService/></ProtectedRoute>},
   {path:"/jobs", element : <ProtectedRoute><Jobs/></ProtectedRoute>},
   {path:"/browse", element :<ProtectedRoute><Browse/></ProtectedRoute> },
   {path:"/profile", element :<ProtectedRoute><Profile/></ProtectedRoute> },
  {path:"/description/:jobId", element :<ProtectedRoute><Description/></ProtectedRoute> },
    {path:"/admin/companies", element :<ProtectedRoute><Companies/></ProtectedRoute> },
   {path:"/admin/companies/create", element :<ProtectedRoute><CreateCompany/></ProtectedRoute> },
   {path:"/admin/companies/:id", element :<ProtectedRoute><CompanySetup/></ProtectedRoute> },



])
function App() {
   
  const dispatch = useDispatch()
   useEffect(()=>{
    try{
       const userData = JSON.parse(localStorage.getItem("userData"))
       if(userData){
           dispatch(setUserData(userData))
       }
    }
    catch(error){
      console.log(error)
    }
   },[])

     return (
   <div>
     <RouterProvider router = {appRouter}>

     </RouterProvider>
    </div>
  )
}

export default App
