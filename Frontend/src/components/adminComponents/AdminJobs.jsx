import React, { useEffect, useState } from 'react'
import Navbar from '../component_lite/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import AdminJobTable from './AdminJobTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { SetSearchJobsByText } from '@/redux/jobSlice'

const AdminJobs = () => {

  // useGetAllCompanies()
  useGetAllAdminJobs()
  const navigate = useNavigate()
  const dispatch =  useDispatch()

  const  [input, setInput] = useState("")
  useEffect(()=>{
     dispatch(SetSearchJobsByText(input))
  },[input])
  const handleNavigate = ()=>{
    navigate("/admin/postJob")
  }
  console.log("input>>>",input)
  return (
    <div>
      <Navbar/>
      <div className='flex flex-col gap-8 item-center justify-center max-w-6xl mx-auto my-10 '>
        <div className='flex w-full justify-between gap-3 '>
           <Input className="w-fit" placeholder="Filter by Title"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            />
           <Button onClick={handleNavigate} className="cursor-pointer">Post New Jobs</Button>
        </div>
        <div className=''>
         <AdminJobTable/>
       </div>
      </div>
    </div>
  )
}

export default AdminJobs
