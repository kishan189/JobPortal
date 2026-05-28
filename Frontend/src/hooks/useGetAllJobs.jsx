import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs, setSearchJobs } from '@/redux/jobSlice'
const useGetAllJobs = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
      const userData = useSelector((state)=>state?.auth?.userData)
       const searchJobQuery = useSelector((state)=>state?.job?.searchJobQuery)
       console.log("searchJobQuery???",searchJobQuery)

    useEffect(()=>{
      const fetchAllJobs = async ()=>{
        try{
            setIsLoading(true)
            const res = await axios.get(`${JOB_API_ENDPOINT}/getJobs?keyword=${searchJobQuery}`,{
                 headers:{
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${userData?.token}`,
            },
                withCredentials:"true"
            })
            console.log("res?.dataLL",res?.data)
            if(res?.data?.status){
                // dispatch(setAllJobs(res?.data?.jobs))
                dispatch(setSearchJobs(res?.data?.jobs))
            }
           
        }
        catch(error){
           console.log(error)
        //    dispatch(setAllJobs([]))
        dispatch(setSearchJobs([]))
        }
        finally{
            setIsLoading(false)
        }
      }
      fetchAllJobs()
    },[])

  
}

export default useGetAllJobs