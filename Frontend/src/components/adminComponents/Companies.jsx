import React from 'react'
import Navbar from '../component_lite/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'

const Companies = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex item-center justify-center max-w-6xl mx-auto my-10'>
        <div className='flex item-center justify-between gap-3'>
           <Input className="w-fit placeholder:Filter by Name"/>
           <Button>Add Company</Button>
        </div>
       <div>
         <CompaniesTable></CompaniesTable>
       </div>
      </div>
    </div>
  )
}

export default Companies