import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
import apiInterceptor from '@/utils/apiInterceptor'
import { setAllCompanies } from '@/redux/companySlice'

const useGetAllCompanies = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
      const userData = useSelector((state)=>state?.auth?.userData)

    useEffect(()=>{
      const fetchAllCompany = async ()=>{
        try{
            setIsLoading(true)
            const res = await apiInterceptor.get(`${COMPANY_API_ENDPOINT}/get`)
            // console.log("res?.data?.company",res?.data?.company)
            if(res?.data?.success){
                dispatch(setAllCompanies(res?.data?.companies))

            }

        }
        catch(error){
           console.log(error)
        }
        finally{
            setIsLoading(false)
        }
      }
      fetchAllCompany()
    },[])

  
}

export default useGetAllCompanies