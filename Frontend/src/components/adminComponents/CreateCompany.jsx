import React, { useState } from 'react'
import Navbar from '../component_lite/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import apiInterceptor from '@/utils/apiInterceptor'
import { useDispatch } from 'react-redux'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setRegisterCompany } from '@/redux/companySlice'

const CreateCompany = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIdLoading] = useState(false)
    const [companyName, setCompanyName] = useState("")

    const handleRegisterCompany = async () => {
        try {
            if (companyName?.length == 0) {
                return
            }
            setIdLoading(true)
            const res = await apiInterceptor.post(`${"http://localhost:5171/api/company/register"}`, { companyName })
            console.log("data>>>::", res)
            if (res?.status) {
                dispatch(setRegisterCompany(res?.data?.company))
                toast.success(res?.data?.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        }
        catch (error) {
            console.log("error>>", error)
            toast.error(error?.response?.data?.message)
        }
        finally {
            setIdLoading(false)
            setCompanyName("")
        }
    }
    return (
        <div>
            <Navbar />

            <div className='max-w-4xl mx-auto'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-bold text-2xl'>Company name</h1>
                    <p className='text-gray-600'>Company Description</p>
                    <Label></Label>
                    <Input type="text" placeholder="Enter the company name"
                        className="my-2"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    {
                        companyName && (
                            <div className='flex items-center gap-2 my-10'>
                                <Button variant="outline" onClick={() => navigate("/admin/companies")} className="cursor-pointer">
                                    Cancel

                                </Button>
                                <Button variant="outline" onClick={handleRegisterCompany} className="cursor-pointer">
                                    {
                                        isLoading ? (
                                            <span>Loading...</span>
                                        ) :
                                            <span>Register</span>
                                    }

                                </Button>
                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default CreateCompany
