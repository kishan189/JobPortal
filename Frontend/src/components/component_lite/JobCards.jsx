import React from 'react'
import { Badge } from '../ui/badge'

const JobCards = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 mt-4 cursor-pointer
    hover:p-3 hover:shadow-blue-200 transition-all duration-300 ease-in-out'>
        <div>
            <h1 className='font-bold'>Company Name</h1>
            <p className='text-gray-500'>India</p>
        </div>
        <div>
            <h2 className='font-bold'>Job Title</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, laborum!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, provident.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, nemo.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid!
            </p>
        </div>
        <div className='flex gap-2 items-center mt-4'>
            <Badge className={"font-bold text-blue-600"} variant="ghost">
                8 Position
            </Badge>
            <Badge className={"font-bold text-[#FA4F09]"} variant="ghost">
                10LPA
            </Badge>
            <Badge className={"font-bold text-[#6B3AC2]"} variant="ghost">
                Remote
            </Badge>
            <Badge className={"font-bold "} variant="ghost">
                Full Time
            </Badge>

        </div>
    </div>
  )
}

export default JobCards