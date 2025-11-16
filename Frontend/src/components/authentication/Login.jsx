import React, { useEffect, useState } from 'react'
import Navbar from '../component_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUserData } from '@/redux/authSlice'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state?.auth?.loading)
    console.log("loading>>>",loading)

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        role: ""

    })

    const changeEventHandler = (e) => {
        setUserInput(
            { ...userInput, [e.target.name]: e.target.value }
        )
    }

    const submitHandler = async (e) => {
       e.preventDefault()

       const userData = JSON.parse(localStorage.getItem("userData"))
       console.log("userD",userData)
       if(userData){
        return
       }
          try{
            dispatch(setLoading(true))
         const res =  await axios.post(
            `${USER_API_ENDPOINT}/login`,
            userInput,
            {
                headers:{
                "Content-Type":"application/json"
            },
            withCredential:true,

          },
         )
         console.log("res",res)
          if(res.data.success){
            toast.success(res.data.message)
             dispatch(setLoading(false))
             dispatch(setUserData(res?.data?.user))
            localStorage.setItem("userData",JSON.stringify(res?.data?.user))
            navigate("/")
         }
        }
 
       catch(error){
         dispatch(setLoading(false))
          console.log("error",error)
           toast.error(res?.response?.data.message)
       }     
 
    }
   
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='flex flex-col gap-2 w-1/2 border border-gray-300 p-4 my-10 rounded-md'>
                    <h1 className='font-bold text-xl mb-5 text-center text-blue-600'>Login</h1>
                    
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="Email"
                            value={userInput.email}
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
                            placeholder="*********">

                        </Input>
                    </div>

                    
                    <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 cursor-pointer">
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
                        No account? <Link to="/register" className='text-blue-600'>Register</Link>
                    </p>

                </form>

            </div>
        </div>
    )
}

export default Login;