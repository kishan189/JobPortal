import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
const useGetAllJobs = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
      const userData = useSelector((state)=>state?.auth?.userData)

    useEffect(()=>{
      const fetchAllJobs = async ()=>{
        try{
            setIsLoading(true)
            const res = await axios.get(`${JOB_API_ENDPOINT}/getJobs`,{
                 headers:{
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${userData?.token}`,
            },
                withCredentials:"true"
            })
            if(res?.data?.status){
                setIsLoading(true)
                dispatch(setAllJobs(res?.data?.data))
            }

        }
        catch(error){
           console.log(error)
        }
        finally{
            setIsLoading(false)
        }
      }
      fetchAllJobs()
    },[])

  
}

export default useGetAllJobs