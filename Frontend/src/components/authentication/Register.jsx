import React, { useState } from 'react'
import Navbar from '../component_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from "sonner"
import { setLoading } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'


const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state?.auth?.loading)

    const [userInput, setUserInput] = useState({
        fullname: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: ""

    })

    const changeEventHandler = (e) => {
        setUserInput(
            { ...userInput, [e.target.name]: e.target.value }
        )
    }

    const submitHandler = async (e)=>{
       e.preventDefault()

       try{
        dispatch(setLoading(true))
         const res =  await axios.post(
            `${USER_API_ENDPOINT}/register`,
            userInput,
            {
                headers:{
                "Content-Type":"application/json"
            },
            withCredential:true,

          }

         )
        console.group("res",res)
         if(res?.data?.success){
            dispatch(setLoading(false))
            toast.success(res?.data?.message)
            navigate("/login")
         }
 

       }
       catch(error){
        dispatch(setLoading(false))
         console.log(error)
          toast.error(res?.response?.data?.message)
       }       
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-300 p-4 my-10 rounded-md'>
                    <h1 className='font-bold text-xl mb-5 text-center text-blue-600'>Register</h1>
                    <div className='my-2'>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            value={userInput.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Mistry">

                        </Input>
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="Email"
                            value={userInput?.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john@gmail.com">

                        </Input>
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={userInput.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="*********"></Input>
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="tel"
                            value={userInput.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+11222233389">

                        </Input>
                    </div>
                    <div className='flex items-center justify-between'>
                        {/* <Label>Role</Label> */}

                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                {/* <RadioGroupItem value="default" id="r1" /> */}
                                <input
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    checked={userInput.role === "Student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"></input>
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* <RadioGroupItem value="comfortable" id="r2" /> */}
                                <input
                                    type="radio" name="role"
                                    value="Recruiter"
                                    checked={userInput.role === "Recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer">

                                </input>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
                         {
                            loading ?
                            (
                             <span>Loading....</span>
                            )
                            :
                            (
                            <span>Login</span>
                            )
                        }
                    </Button>
                    <p className='text-gray-500 text-md py-3'>
                        Already have account? <Link to="/login" className='text-blue-600'>Login</Link>
                    </p>

                </form>

            </div>
        </div>
    )
}

export default Register