import React, { useEffect, useState } from 'react'
import Navbar from '@/components/component_lite/Navbar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import apiInterceptor from '@/utils/apiInterceptor'
import { fetchJobById, setAppliedJob } from '@/redux/jobSlice'

const array = [
    {
        label: "Role",
        value: "Front-end Developer"
    },
    { value: "Remote", label: "Location" },
    { value: "20k", label: "Salary" },
    { value: "1 year", label: "Experience" },
]
const Description = () => {

    const allJobs = useSelector((state) => state?.job?.allJobs)
    const jobDetails = useSelector((state) => state?.job?.jobDetails)
    const userData = useSelector((state) => state?.auth?.userData)
    const { jobId } = useParams()
    const dispatch = useDispatch()

    const [isJobApplied, setIsJobApplied] = useState(false)

    const [currentJob, setCurrentJob] = useState(null)
    const [isLoading, setIdLoading] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(false)

    useEffect(() => {
        const getJobById = async () => {
            setIsPageLoading(true);
            try {
                await dispatch(fetchJobById(jobId));
            } catch (error) {
                console.log(error);
            } finally {
                setIsPageLoading(false);
            }
        };

        getJobById();
    }, [jobId]);


    useEffect(() => {
        if (jobDetails) {
            setCurrentJob(jobDetails)
        }

    }, [jobDetails])

    useEffect(() => {
        console.log("currentJob>>>>>>>>>>", currentJob)
    }, [currentJob])

    useEffect(() => {
        const isApplied = currentJob?.applications?.some((applicant) => applicant?.applicant === userData?._id)
        console.log("isApplied>>>>>99", isApplied)
        if (isApplied) {
            setIsJobApplied(true)
        }
        else {
            setIsJobApplied(false)
        }

    }, [currentJob, userData])

    useEffect(() => {
        console.log("isJobApplied>>", isJobApplied)
    }, [isJobApplied])


    const handleJobApply = async (jobId) => {
        try {
            if (jobId) {
                setIdLoading(true)
                const data = await apiInterceptor.post(`${"http://localhost:5171/api/application/apply"}/${jobId}`)
                console.log("data>>>::", data)
                if (data?.status) {
                    setIsJobApplied(true)
                    dispatch(setAppliedJob({ jobId, applicationId: userData?._id }))
                }
            }


        }
        catch (error) {
            setIsJobApplied(false)
        }
        finally {
            setIdLoading(false)
        }
    }


    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto mt-8'>
                <div className='flex flex-col gap-4 border-b border-gray-300 pb-4'>
                    <div className='flex justify-between'>
                        <h1 className='font-bold text-[18px]'>
                            {currentJob?.title}
                        </h1>
                        {
                            isJobApplied ? (
                                <Button variant="outline">Already Applied</Button>
                            ) :
                                (
                                    <Button variant="outline" className="cursor-pointer" onClick={() => handleJobApply(currentJob?._id)}>
                                        {
                                            isLoading ? (
                                                <span>Loading...</span>
                                            ) :
                                                (
                                                    <span>Apply Now</span>
                                                )
                                        }
                                    </Button>
                                )
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Badge className={"font-bold text-blue-600"} variant="ghost">
                            {currentJob?.position}
                        </Badge>
                        <Badge className={"font-bold text-[#FA4F09]"} variant="ghost">
                            {currentJob?.salary}LPA
                        </Badge>
                        {/* <Badge className={"font-bold text-[#6B3AC2]"} variant="ghost">
                            Remote
                        </Badge> */}
                        <Badge className={"font-bold "} variant="ghost">
                            {currentJob?.jobType}
                        </Badge>

                    </div>
                    <div>
                        <span className='font-semibold'>Job Description</span>
                        <p>
                            {currentJob?.description}
                        </p>
                    </div>
                </div>
                <div className='py-6'>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%]'>
                            <span className='font-semibold'>Title</span>
                        </div>
                        <div>
                            <span>{currentJob?.title}</span>
                        </div>
                    </div>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%]'>
                            <span className='font-semibold'>Location</span>
                        </div>
                        <div>
                            <span>{currentJob?.location}</span>
                        </div>
                    </div>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%]'>
                            <span className='font-semibold'>Job Type</span>
                        </div>
                        <div>
                            <span>{currentJob?.jobType}</span>
                        </div>
                    </div>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%]'>
                            <span className='font-semibold'>experience</span>
                        </div>
                        <div>
                            <span>{currentJob?.experience}</span>
                        </div>
                    </div>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%]'>
                            <span className='font-semibold'>applications</span>
                        </div>
                        <div>
                            <span>{currentJob?.applications?.length}</span>
                        </div>
                    </div>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%]'>
                            <span className='font-semibold'>Salary</span>
                        </div>
                        <div>
                            <span>{typeof currentJob?.salary === "number" ? `${currentJob?.salary} LPA` : currentJob?.salary}</span>
                        </div>
                    </div>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%] '>
                            <span className='font-semibold'>Requirements</span>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {
                                currentJob?.requirements?.map((skill, index) => (
                                    <div key={index}>
                                        <span>{skill},</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='max-w-[500px] flex gap-6'>
                        <div className='w-[30%]'>
                            <span className='font-semibold'>Position</span>
                        </div>
                        <div>
                            <span>{currentJob?.position}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description