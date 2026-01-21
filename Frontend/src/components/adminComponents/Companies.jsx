import React, { useState } from 'react'
import Navbar from '../component_lite/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const Companies = () => {

  useGetAllCompanies()
  const navigate = useNavigate()

  const  [input, setInput] = useState("")
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleNavigate = ()=>{
    navigate("/admin/companies/create")
  }
  return (
    <div>
      <Navbar/>
      <div className='flex flex-col gap-8 item-center justify-center max-w-6xl mx-auto my-10 '>
        <div className='flex w-full justify-between gap-3 '>
           <Input className="w-fit" placeholder="Filter by Name"
            value={input}
            onChange={handleChange}
            />
           <Button onClick={handleNavigate} className="cursor-pointer">Add Company</Button>
        </div>
        <div className=''>
         <CompaniesTable/>
       </div>
      </div>
    </div>
  )
}

export default Companies