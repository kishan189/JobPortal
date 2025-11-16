import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUserData } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const UpdateProfilePictureModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.userData);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected)); // for live preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image to upload");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("profilePhoto", file);

      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/picture/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success("Profile picture updated successfully!");
        dispatch(setUserData({ ...userData, profile: { ...userData.profile, profilePhoto: res.data.profilePhoto } }));
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={preview || userData?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                alt="Preview"
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

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer text-sm text-gray-600"
            />
          </div>

          <DialogFooter className="flex justify-end mt-4 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePictureModal;
