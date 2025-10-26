
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { PopoverContent, Popover, PopoverTrigger } from '../ui/popover'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'

function Navbar() {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        try{
            const userData = JSON.parse(localStorage.getItem("userData"))
            setUser(userData)
        }
        catch(error){

        }
    },[])

    const handleLogout = ()=>{
        localStorage.clear()
        navigate("/login")
    }
    return (
        <div className='bg-white'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16'>
                <div className="text-2xl font-bold">
                    Job <span className='text-[#022bf8]'>
                        Portal
                    </span>

                </div>
                <div className="flex item-center justify-between gap-8">
                    <ui className="flex font-medium items-center gap-6 list-none">
                        <Link to={"/"}><li>Home</li></Link>
                        <li>Browse</li>
                        <li>Jobs</li>
                    </ui>
                    {
                        !user ? (
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
                                                src="https://github.com/shadcn.png"
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>

                                        </Avatar>
                                        {/* </Button> */}

                                    </PopoverTrigger>
                                    <PopoverContent className="w-60">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="leading-none font-medium">{user?.fullname}</h4>
                                                <p className="text-muted-foreground text-sm">
                                                    Set the dimensions for the layer.
                                                </p>
                                            </div>
                                            <div className='flex flex-col gap-3 text-gray-600'>
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2></User2>
                                                    <Button variant="link">View Profile</Button>
                                                </div>
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'
                                                onClick={handleLogout}>
                                                    <LogOut></LogOut>
                                                    <Button variant="link">Logout</Button>
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
