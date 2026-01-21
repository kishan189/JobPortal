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

const CompanySetup = () => {

    const companyId = useParams().id
    const singleCompany = useSelector((state)=>state?.company?.singleCompany)
    console.log("singleCompany>>>l>",singleCompany)

     useGetCompanyById(companyId)
    

    const  navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:""
    })
   
    useEffect(()=>{

        if(singleCompany){
            setInput({
                name:singleCompany?.name || "",
                description:singleCompany?.description || "",
                website:singleCompany?.website || "",
                location:singleCompany?.location || "",
                file:singleCompany?.logo || ""
            })
        }

    },[singleCompany])
    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log("file>>>>",file)
        if (file) {
            setInput({ ...input, file:file})
        }
    }

    const submitHander = async (e)=>{
        e.preventDefault()
        console.log("input>>",input)
        const formData = new FormData()
        formData.append("name",input.name)
        formData.append("description",input.description)
        formData.append("website",input.website)
        formData.append("location",input.location)
        formData.append("file",input.file)
        console.log("formData>>",formData)
        try {
            
            setIsLoading(true)
            const res = await apiInterceptor.post(`http://localhost:5171/api/company/update/${companyId}`, formData)
            console.log("data>>>::", res)
            if (res?.status) {
                // dispatch(setRegisterCompany(res?.data?.company))
                toast.success(res?.data?.message)
                // const companyId = res?.data?.company?._id
                navigate(`/admin/companies`)
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
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHander}>
                    <div className='flex item-cetner justify-between gap-5 p-8'>
                        <Button className="flex cursor-pointer" varient="outline" onClick={()=>navigate(`/admin/companies`)}>
                            <ArrowLeft />
                            <span>Back</span>

                        </Button>
                        <h1 className='text-xl font-bold text-blue-600'>Company Setup</h1>
                    </div>
                    <div>
                        <Label >
                        Company Name
                        </Label>
                        <Input type = "text" name="name" value={input.name} onChange={handleChange}>
                        </Input>
                    </div>
                    <div>
                        <Label >
                          Description
                        </Label>
                        <Input type = "text" name="description" value={input.description} onChange={handleChange}>
                        </Input>
                    </div>
                    <div>
                        <Label >
                         Website
                        </Label>
                        <Input type = "text" name="website" value={input.website} onChange={handleChange}>
                        </Input>
                    </div>
                    <div>
                        <Label >
                         Locations
                        </Label>
                        <Input type = "text" name="location" value={input.location} onChange={handleChange}>
                        </Input>
                    </div>
                    <div>
                        <Label >
                        company Logo
                        </Label>
                        <Input type = "file" name="file" onChange={handleFileChange}>
                        </Input>
                    </div>
                    <div className='mt-4'>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer" varient="outline" disabled={isLoading} onClick={submitHander}>
                        {isLoading ? <span>Loading...</span> : <span>Submit</span>}
                    </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CompanySetup