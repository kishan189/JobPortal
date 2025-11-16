import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { setUserData } from "@/redux/authSlice";
import { toast } from "sonner";

const EditProfileModal = ({ isEditProfile, setIsEditProfile }) => {
  const dispatch = useDispatch()
  const userData = useSelector((state)=>state?.auth?.userData)
  const [isLoading, setIsLoading] = useState(false)
  
  const [userInput, setUserInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio:"",
    skills:"",
    resume:""
  });

  useEffect(()=>{
    console.log("isEditProfileLLLLLLLL",isEditProfile)
  },[isEditProfile])

  useEffect(()=>{
   setUserInput({
    fullname:userData?.fullname,
    email:userData?.email,
    phoneNumber:userData?.phoneNumber,
    bio:userData?.profile?.bio,
    skills:userData?.profile?.skills?.map((skill)=>skill),
    resume:userData?.profile?.resume
   })
  },[])

  // const changeEventHandler = (e) => {
  //   setUserInput({ ...userInput, [e.target.name]: e.target.value });

  // };
  const changeEventHandler = (e) => {
  const { name, value, files } = e.target;
  
  if (name === "resume") {
    setUserInput({ ...userInput, resume: files[0] }); // 👈 use files[0], not value
  } else {
    setUserInput({ ...userInput, [name]: value });
  }
};


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", userInput);
     const formData = new FormData();
    formData.append("fullname",userInput?.fullname)
    formData.append("email",userInput?.email)
    formData.append("phoneNumber",userInput?.phoneNumber)
    formData.append("skills",userInput?.skills)
     formData.append("bio",userInput?.bio)
    if(userInput?.resume){
      console.log("################################",)
        formData.append("file",userInput?.resume)
        console.log("formData>>>>>>>>>>>>>>>>>>>",formData)
    }

    try{
        setIsLoading(true)
        const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${userData?.token}`,
            },
            withCredentials:true
        })
        if(res?.data?.success){
            setIsLoading(false)
             setIsEditProfile(false)
            dispatch(setUserData(res?.data?.user))
            toast.success("Successfully user profile updated")
        }

    }
    catch(error){
        setIsLoading(false)
        console.log("error")
        toast.error(res?.response?.data.message)    
    }


    // You can add your API call here
  };

  return (
    <Dialog
      open={isEditProfile}
      onOpenChange={(open) => setIsEditProfile(open)} // ✅ This handles outside or ESC close
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="w-[30%]">Name</Label>
            <Input
              type="text"
              value={userInput.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="John Mistry"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="w-[30%]">Email</Label>
            <Input
              type="email"
              value={userInput?.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="john@gmail.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="w-[30%]">Phone No.</Label>
            <Input
              type="tel"
              value={userInput?.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+11222233389"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-[30%]">Bio</Label>
            <Input
              type="text"
              value={userInput?.bio}
              name="bio"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-[30%]">Skills</Label>
            <Input
              type="text"
              value={userInput?.skills}
              name="skills"
              onChange={changeEventHandler}
           
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="w-[30%]">Resume</Label>
            <Input
              type="file"
              // value={userInput?.file}
              name="resume"
              onChange={changeEventHandler}
             className="cursor-pointer"
            />
          </div>



          <DialogFooter className="flex justify-end mt-4 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditProfile(false)} // ✅ Manual close button
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
