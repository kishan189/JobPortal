import AppliedJobs from '@/components/component_lite/AppliedJobs'
import EditProfileModal from '@/components/component_lite/EditProfileModal'
import Navbar from '@/components/component_lite/Navbar'
import UpdateProfilePictureModal from '@/components/component_lite/UpdateProfilePictureModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const skills = [
    "Backend Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Software Engineer",
    "Data Engineer",
    "AI / ML Engineer",
]
const Profile = () => {

    const [isEditProfile, setIsEditProfile] = useState(false)
    const userData = useSelector((state) => state?.auth?.userData)
    const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);



    const handleEditProfile = () => {
        setIsEditProfile(true)
    }
    useEffect(() => {
        console.log("isEditProfile>>", isEditProfile)
    }, [isEditProfile])
    return (
        <div>
            <Navbar />
            <UpdateProfilePictureModal  isOpen={isPictureModalOpen}
            setIsOpen={setIsPictureModalOpen}/>
            <div className='max-h-[90vh] overflow-y-scroll'>
                <div className='max-w-7xl mx-auto flex flex-col gap-4 bg-white border border-b-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400
                     hover:shadow-amber-200'>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="cursor-pointer w-16 h-16 " onClick={() => setIsPictureModalOpen(true)}>
                                <AvatarImage
                                    src={userData?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                                    alt={userData?.fullname || "User"}
                                />
                                <AvatarFallback>
                                    {userData?.fullname
                                        ? userData.fullname
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()
                                        : "U"}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <p className="font-bold text-[22px]">{userData?.fullname}</p>
                                <p className="text-[14px]">{userData?.profile?.bio}</p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleEditProfile}
                            className="cursor-pointer"
                        >
                            <Pen />
                        </Button>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-3 items-center'>
                            <Mail />
                            <span>
                                <a href={`mailto:${userData?.email}`}>{userData?.email}</a>
                            </span>

                        </div>
                        <div className='flex gap-3 items-center'>
                            <Contact />
                            <span>
                                <a href={`tel:${userData?.phoneNumber}`}>{userData?.phoneNumber}</a>
                            </span>

                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-[18px]'>Skills</p>
                        <div className='flex flex-wrap max-w-[70%] items-center gap-2 '>
                            {
                                userData?.profile?.skills?.length > 0 ? (
                                    userData?.profile?.skills?.map((skill, index) => (
                                        <Badge>{skill}</Badge>
                                    ))
                                ) :
                                    (
                                        <span>NA</span>
                                    )
                            }
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 max-w-[200px]'>
                        <lable className="text-md font-bold"> Resume</lable>
                        {
                            userData?.profile?.resume ? (
                                <a
                                    target="_blank"
                                    href={userData?.profile?.resume}
                                    // download="resume.pdf"
                                    className='text-blue-500 hover:text-blue-600 cursor-pointer'
                                >
                                    {userData?.profile?.resumeOriginalname}

                                </a>
                            ) :
                                (
                                    <span>No Resume Found</span>
                                )
                        }
                    </div>

                </div>
                <div className='flex flex-col max-w-7xl mx-auto'>
                    <p className='font-bold text-[18px]'>
                        Applied Job
                    </p>
                    {/* table for applied jobs */}
                    <AppliedJobs />
                </div>
                <div>
                    {
                        isEditProfile && (
                            <EditProfileModal isEditProfile={isEditProfile} setIsEditProfile={setIsEditProfile} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile