import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Navbar from './components/component_lite/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import { Home } from './components/component_lite/Home'
import { ProtectedRoute } from './utils/ProtectedRoute'

const appRouter = createBrowserRouter([
  {path:"/", element : 
  <ProtectedRoute><Home/></ProtectedRoute>},
  {path:"/login", element : <Login/>},
  {path:"/register", element : <Register/>}
])
function App() {

  return (
   <div>
     <RouterProvider router = {appRouter}>

     </RouterProvider>
    </div>
  )
}

export default App
