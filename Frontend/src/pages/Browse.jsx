import Job1 from '@/components/component_lite/Job1'
import Navbar from '@/components/component_lite/Navbar'
import { fetchAllJobs } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,1,1,1,1,1,1,1,1,1,11,1]

const Browse = ({}) => {
  
    const allJobs = useSelector((state) => state?.job?.allJobs)
    const dispatch = useDispatch()
     useEffect(() => {
            if(allJobs?.length==0){
                dispatch(fetchAllJobs());
            }
           
        }, [])
    
  return (
    <div className=''>
      <Navbar/>
     <div className='max-w-7xl mx-auto '>
       <div>

       </div>
        {
      <div className='flex-1 max-h-[85vh] overflow-y-auto'>
        <div className='grid grid-cols-3 gap-4'>
              {
                allJobs?.map((job, index) => (
                  <Job1 key={index} job={job}/>
                  ))
              }
          </div>
        </div>
     }
     </div>
 
    </div>
  )
}

export default Browse