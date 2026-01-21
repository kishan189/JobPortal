import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { PopoverContent, Popover, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobTable = () => {
  
  const navigate = useNavigate()
    const allAdminJobs = useSelector((state) => state?.job?.allAdminJobs)
    const searchJobsByText = useSelector((state) => state?.job?.searchJobsByText)


  const [filterAdminJobs, setfilterAdminJobs] = useState([])


  useEffect(()=>{
    const filterJobs =  allAdminJobs?.filter((job,index)=>{
       if(!searchJobsByText){
        return job;
       }
       return job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase())
    })
    console.log("filterAdminJobs>>>>>>",filterJobs)
        setfilterAdminJobs(filterJobs)
  },[searchJobsByText,allAdminJobs])

 console.log("filterAdminJobs>>",filterAdminJobs)
  console.log("allAdminJobs>>", allAdminJobs)

  const handleEditCompany =  (companyId)=>{
    console.log("hhh")
    navigate(`/admin/companies/${companyId}`)
  }
  
   const getJobPostDays = (createdTime)=>{
       if(!createdTime){
        return 0
       }
        const postedDate = new Date(createdTime)
        const currentDate = new Date()

        const dateDifference =  currentDate.getTime()- postedDate.getTime()
        const diffDays = Math.floor(dateDifference/(1000*3600*24))
        return diffDays
    }

  return (
    <div>
      <Table>
        <TableCaption> Your Recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Experienc</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Job Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>

          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterAdminJobs?.length > 0 ? (
              filterAdminJobs?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {item?.company?.name}
                  </TableCell>
                  <TableCell>{item?.title}</TableCell>
                   <TableCell>{item?.position}</TableCell>
                    <TableCell>{item?.experience}</TableCell>
                    <TableCell>{item?.salary}</TableCell>
                    <TableCell>{item?.jobType}</TableCell>
                    <TableCell>{ !getJobPostDays(item?.createdAt) ? `${getJobPostDays(item?.createdAt)} day ago`:`${getJobPostDays(item?.createdAt)} days ago`}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        {""}
                        <MoreHorizontal className='cursor-pointer' />
                        {""}
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div className='flex gap-3 cursor-pointer' onClick={()=>handleEditCompany(item?._id)}>
                          <Edit2></Edit2>
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center  h-[50vh]'>No companies found</TableCell>
              </TableRow>
            )
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobTable
