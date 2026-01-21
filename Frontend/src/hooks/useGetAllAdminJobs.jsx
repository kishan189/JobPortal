import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice'
import apiInterceptor from '@/utils/apiInterceptor'
const useGetAllAdminJobs = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
      const userData = useSelector((state)=>state?.auth?.userData)

    useEffect(()=>{
      const fetchAllAdminJobs = async ()=>{
        try{
            setIsLoading(true)
            const res = await apiInterceptor.get(`${JOB_API_ENDPOINT}/getadminjobs`)
            if(res?.data?.status){
                console.log("res?.data?.jobs",res?.data?.jobs)
                setIsLoading(true)
                dispatch(setAllAdminJobs(res?.data?.jobs))
            }

        }
        catch(error){
           console.log(error)
        }
        finally{
            setIsLoading(false)
        }
      }
      fetchAllAdminJobs()
    },[])

  
}
export default useGetAllAdminJobs
