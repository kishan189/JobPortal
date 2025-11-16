import FilterDrawer from '@/components/component_lite/FilterDrawer'
import Job1 from '@/components/component_lite/Job1'
import Navbar from '@/components/component_lite/Navbar'
import { fetchAllJobs } from '@/redux/jobSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Jobs = () => {

    const allJobs = useSelector((state) => state?.job?.allJobs)

    const dispatch = useDispatch()
    
    useEffect(() => {
        if(allJobs?.length==0){
            dispatch(fetchAllJobs());
        }
       
    }, [])

    // console.log("alljobs", allJobs)
    return (
        <div className=''>
            <Navbar />
            <div className='max-w-7xl mx-auto '>
                <div className='flex w-full gap-5'>
                    <div className='w-[20%] pt-2 '>
                        <FilterDrawer />
                    </div>
                    <div className=' flex flex-col w-[80%] '>
                        {
                            allJobs?.length <= 0 ? (
                                <div>
                                    <span className='text-red-300'>Job not found</span>
                                </div>
                            ) :
                                (
                                    <div className='flex-1 max-h-[88vh] overflow-y-auto'>
                                        <div className='grid grid-cols-3 gap-4'>
                                            {
                                                allJobs?.map((job, index) => (
                                                    <Job1 key={index} job={job} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}
