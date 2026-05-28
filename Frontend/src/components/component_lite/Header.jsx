import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { HiBuildingOffice2 } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { setSearchJobQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate("")

  const searchJobHandler = ()=>{
    console.log("ppppppppp")
     dispatch(setSearchJobQuery(query))
    //  setQuery("")
     navigate("/browse")
  }
  useEffect(()=>{
    console.log("query>>>",query)
  },[query])
  return (
    <div>
      <div className='flex flex-col text-center items-center justify-center gap-4 py-8'>
         <div className='flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-gray-200 text-[12px] font-medium text-red-600'>
           <HiBuildingOffice2 className='text-[#614232]'/> No.1 Job Hunt Website
        </div>
        <h1 className='text-5xl font-bold'>
            Search, Apply &<br/> Get Your <span className='text-[#6A38C2]'> Dream Job</span>
        </h1>
        <p>
            Start  your hunt the best, life-ching career opportunities.
            from here in your <br/> selected areas conventiently and get hired quickly.
        </p>
        <div className='flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input
            type='text'
            placeholder='Find your dream job' 
            className='outline-none border-none w-full '
            onChange={(e)=>setQuery(e.target.value)}
            />
            <Button className="rounded-r-full" onClick={()=>searchJobHandler()}>
              <Search className='h-5 w-5' />
            </Button>
            
        </div>
      </div>
    </div>
  )
}

export default Header