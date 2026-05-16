import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
import apiInterceptor from '@/utils/apiInterceptor'
import { setSingleCompany } from '@/redux/companySlice'
const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
      const userData = useSelector((state)=>state?.auth?.userData)

    useEffect(()=>{
      const fetchSingleCompany = async ()=>{
        try{
            setIsLoading(true)
            const res = await apiInterceptor.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`)
            // console.log("res?.data?.company",res?.data?.company)
            if(res?.data?.success){
                dispatch(setSingleCompany(res?.data?.company))

            }

        }
        catch(error){
           console.log(error)
        }
        finally{
            setIsLoading(false)
        }
      }
      fetchSingleCompany()
    },[companyId, dispatch])

  
}

export default useGetCompanyById