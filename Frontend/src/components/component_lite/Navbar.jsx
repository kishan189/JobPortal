
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { PopoverContent, Popover, PopoverTrigger } from '../ui/popover'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT} from '@/utils/data'

function Navbar() {

    const [user, setUser] = useState(null)
    const userData = useSelector((state) => state?.auth?.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLogoutLoading, setIsLogoutLoading] = useState(false)

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"))
            setUser(userData)
        }
        catch (error) {

        }
    }, [])

    const handleLogout = async () => {
        try {
             setIsLogoutLoading(true)
            
            const res = await axios.post(
               `${USER_API_ENDPOINT}/logout`,
                {
                withCredential: true,
                },
            )
            console.log("res", res)
            if (res.data.success) {
                 setIsLogoutLoading(false)
                toast.success(res.data.message)
                localStorage.clear()
                dispatch(setUserData(null))
                // navigate("/login")
            }
        }

        catch (error) {
            console.log("error", error)
             setIsLogoutLoading(false)
            toast.error(res?.response?.data.message)
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16'>
                <div className="text-2xl font-bold">
                    <span className='text-[#FA4F09]'>Job </span>
                    <span className='text-[#6A38C2]'>
                        Portal
                    </span>

                </div>
                <div className="flex item-center justify-between gap-8">
                    <ui className="flex font-medium items-center gap-6 list-none">
                        <Link to={"/"}><li>Home</li></Link>
                        <Link to="/browse">Browse</Link>
                        <Link to="/jobs">Jobs</Link >
                    </ui>
                    {
                        !userData ? (
                            <div className='flex items-center justify-center gap-4'>
                                <Link to={"/login"}>
                                    <Button variant="outline" className="cursor-pointer">Login</Button>
                                </Link>
                                <Link to={"/register"}>
                                    <Button className="cursor-pointer bg-red-500 hover:bg-red-600">Register</Button>
                                </Link>

                            </div>
                        ) :
                            (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        {/* <Button variant="outline" className="cursor-pointer"> */}
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                // src="https://github.com/shadcn.png"
                                                src={userData?.profile?.profilePhoto}
                                                alt="profile pic"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>

                                        </Avatar>
                                        {/* </Button> */}

                                    </PopoverTrigger>
                                    <PopoverContent className="w-60">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="leading-none font-medium">{userData?.fullname}</h4>
                                                <p className="text-muted-foreground text-sm">
                                                    Set the dimensions for the layer.
                                                </p>
                                            </div>
                                            <div className='flex flex-col gap-3 text-gray-600'>
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2></User2>
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'
                                                    onClick={handleLogout}
                                                    >
                                                    <LogOut></LogOut>
                                                    <Button variant="link" className="cursor-pointer">
                                                        {
                                                            isLogoutLoading ? (
                                                                <span>Loading....</span>
                                                            ):
                                                            <span>Logout</span>
                                                        }
                                                        
                                                     </Button>
                                                </div>
                                            </div>

                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }



                </div>
            </div>

        </div>
    )
}

export default Navbar
