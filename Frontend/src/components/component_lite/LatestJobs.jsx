import React from 'react'
import JobCards from './JobCards'

const jobs = [1,2,3,4,5,6]

const LatestJobs = () => {
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h2 className='text-4xl font-bold'>
            <span className='text-[#6A38C2]'>Latest & Top</span> <span>Job Openings</span>
        </h2>
        <div className='grid grid-cols-3 gap-6'>
            {
                jobs?.map((job,index)=>{
                    return (
                        <JobCards key={index}/>
                    )
                })
            }

        </div>
    </div>
  )
}

export default LatestJobs