import React, { useEffect, useState } from 'react'
import Navbar from '../component_lite/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import apiInterceptor from '@/utils/apiInterceptor'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { UpdateAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/data'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const PostJob = () => {

    const companyId = useParams().id
    const singleCompany = useSelector((state) => state?.company?.singleCompany)
    const companyList = useSelector((state) => state?.company?.companyList)
    console.log("singleCompany>>>l>", singleCompany)
    console.log("companyList>>>>",companyList)


    useEffect(()=>{
      if(companyList?.length<0){
        useGetAllCompanies()

    }
    },[])


    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        location: "",
        salary: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId:"",
    })
console.log("input>>>",input)
    useEffect(() => {

        console.log("input@@@@",input)
    }, [input])
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHander = async (e) => {
        e.preventDefault()
        console.log("input>>", input)

        try {

            setIsLoading(true)
            const res = await apiInterceptor.post(`${JOB_API_ENDPOINT}/post`, input)
            console.log("data>>>::", res)
            if (res?.status) {
                // dispatch(UpdateAllAdminJobs(res?.data?.company))
                toast.success(res?.data?.message)
                // const companyId = res?.data?.company?._id
                navigate(`/admin/jobs`)
            }
        }
        catch (error) {
            console.log("error>>", error)
            toast.error(error?.response?.data?.message)
        }
        finally {
            setIsLoading(false)
            setInput({})
        }
    }

    const handleCompanyChange = (value)=>{
        console.log("input>>!!!!##",input)
         const selectedCompany = companyList?.find((company)=>company.name.toLowerCase()===value)

         setInput({...input, companyId:selectedCompany?._id})
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form  className='border border-gray-100 rounded-2xl px-3 pb-4 shadow-2xl'>
                    <div className='flex item-cetner justify-between gap-5 p-8'>
                        <Button className="flex cursor-pointer" varient="outline" onClick={() => navigate(`/admin/jobs`)}>
                            <ArrowLeft />
                            <span>Back</span>

                        </Button>
                        <h1 className='text-xl font-bold text-blue-600'>Job Details</h1>
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <div>
                            <Label >
                                Title
                            </Label>
                            <Input type="text" name="title" value={input.name} onChange={handleChange} size="30">
                            </Input>
                        </div>
                        <div>
                            <Label >
                                Description
                            </Label>
                            <Input type="text" name="description" value={input.description} onChange={handleChange} size="30">
                            </Input>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-between'>
                        <div>
                            <Label >
                                Skills
                            </Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={handleChange} size="30">
                            </Input>
                        </div>
                        <div>
                            <Label >
                                Position
                            </Label>
                            <Input type="text" name="position" value={input.position} onChange={handleChange} size="30">
                            </Input>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-between'>
                        <div>
                            <Label >
                                Salary
                            </Label>
                            <Input type="text" name="salary" value={input.salary} onChange={handleChange} size="30">
                            </Input>
                        </div>
                        <div>
                            <Label >
                                Experience
                            </Label>
                            <Input type="text" name="experience" value={input.experience} onChange={handleChange} size="30">
                            </Input>
                        </div>
                    </div>
                    <div className='flex gap-3 justify-between'>
                        <div>
                            <Label >
                                JobType
                            </Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={handleChange} size="30">
                            </Input>
                        </div>
                        <div>
                            <Label >
                                Locations
                            </Label>
                            <Input type="text" name="location" value={input.location} onChange={handleChange} size="30">
                            </Input>
                        </div>
                    </div>
                    { companyList?.length > 0 &&
                    <div className='py-3'>
                        <Select onValueChange={handleCompanyChange}>
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="select a company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        companyList?.map((company,id)=>(
                                             <SelectItem value={company?.name?.toLowerCase()} key={company?._id}>{company?.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    }

                    <div className='mt-6'>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer" varient="outline" disabled={isLoading} onClick={submitHander}>
                            {isLoading ? <span>Loading...</span> : <span>Submit</span>}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default PostJob
