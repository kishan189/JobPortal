import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobById } from '@/redux/jobSlice'
const Job1 = ({job}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector((state) => state?.job?.loading)
    const [activeJobId, setActiveJobId] = useState(null)

    const handleNavigateDetail = async (jobId) => {
        setActiveJobId(jobId)
        const data = await dispatch(fetchJobById(jobId));

        console.log("data job by id", data);

        if (data?.payload?.status) {
            navigate(`/description/${jobId}`);
        }
    };

   
    const getJobPostDays = (createdTime)=>{
        const postedDate = new Date(createdTime)
        const currentDate = new Date()

        const dateDifference =  currentDate.getTime()- postedDate.getTime()
        const diffDays = Math.floor(dateDifference/(1000*3600*24))
        return diffDays
    }

//     {
//     "applications": [],
//     "_id": "6856ea8786edc67c86905f04",
//     "title": "Front end developer",
//     "description": "developer",
//     "requirements": [
//         "mern"
//     ],
//     "location": "Delhi",
//     "salary": 10,
//     "experience": 1,
//     "jobType": "Office",
//     "company": {
//         "_id": "685197699b2fea4928247208",
//         "name": "salesForce2",
//         "userId": [
//             "684c4d464bd9ef41bde79b90"
//         ],
//         "createdAt": "2025-06-17T16:27:21.813Z",
//         "updatedAt": "2025-06-17T17:22:33.230Z",
//         "__v": 0,
//         "description": "crm2"
//     },
//     "position": "14",
//     "created_by": "684c4d464bd9ef41bde79b90",
//     "application": null,
//     "__v": 0
// }
    return (
        <div className='p-5 flex flex-col justify-between rounded-md shadow-xl bg-white border border-gray-200 mt-4 
            hover:shadow-blue-200 transition-all duration-300 ease-in-out'>
            <div className='flex items-center justify-between'>
                <p>{getJobPostDays(job?.company?.createdAt)===0 ? "Today" : `${getJobPostDays(job?.company?.createdAt)} Days ago`}</p>
                <Button variant="outline" className="rounded-full cursor-pointer" size="icon">

                    <Bookmark />
                </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>

                <div className='flex flex-col'>
                    <div className='flex gap-3 items-center'>
                        <Button variant="outline" size="icon">
                            <Avatar>
                                <AvatarImage src="https://1000logos.net/wp-content/uploads/2018/08/Huawei-Logo.png">

                                </AvatarImage>
                            </Avatar>
                        </Button>
                        <h1 className='font-bold'>{job?.company?.name}</h1>
                    </div>
                    <p className='text-gray-500'>{job?.location}</p>
                    <div>
                        <h2 className='font-bold'>{job?.title}</h2>
                        <p className='text-gray-500 text-[14px]'>
                            {job?.description}
                        </p>
                    </div>
                    <div className='flex flex-wrap gap-2 items-center mt-4'>
                        <Badge className={"font-bold text-[10px] text-blue-600"} variant="ghost">
                            {job?.position} Position
                        </Badge>
                        <Badge className={"font-bold text-[#FA4F09] text-[10px]"} variant="ghost">
                            {job?.salary}LPA
                        </Badge>
                        <Badge className={"font-bold text-[#6B3AC2] text-[10px]"} variant="ghost">
                            {job?.jobType}
                        </Badge>
                        <Badge className={"font-bold text-[10px]"} variant="ghost">
                            {job?.experience} years
                        </Badge>

                    </div>
                </div>
                

            </div>
            <div className='flex items-center justify-between pt-3'>
                        <Button variant="outline" className="cursor-pointer"
                        onClick={()=>handleNavigateDetail(job?._id)}>
                            {
                               (activeJobId=== job?._id && loading) ? (
                                    <span>Loading...</span>
                                ):
                                <span>Details</span>
                            }
                          
                        </Button>
                        <Button variant="outline" className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 hover:text-white">
                            <span>Save For Latter</span>

                        </Button>
                    </div>
            
        </div>
    )
}

export default Job1