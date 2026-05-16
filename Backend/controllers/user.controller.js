import { User } from "../modals/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import getDataUrl from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";
export const register = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            })
        }
        // convert password into hash

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role
        });
        await newUser.save()

        return res.status(200).json({
            message: `Account created successfully ${fullname}`,
            success: true,
        })

    }
    catch (error) {
        console.log("error", error)
        res.status(400).json({
            message: "Missing required fields",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false
            });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false,
            })
        }

        // generate token
        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: false,   // ✅ allow cookies over HTTP in local
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000,
            // sameSite: "strict"
        })
            .json({
                message: `Welcome back ${userResponse.fullname}`,
                user: { ...userResponse, token },
                success: true
            })

    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


export const logout = async (req, res) => {
    try {

        return res.status(200).cookie("token", "", { maxAge: 0 })
            .json({
                message: `Logged out successfully`,
                success: true
            })

    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Missing required fields",
            success: false
        });
    }
}

export const getUserData = async (req, res) => {
    try {

        const userId = req.userId  //middleware authentication
        console.log("userId>>>>>>>>>>>",userId)
        // Find user by email
        let user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
       
        res.json({
                message: `Successfully fetched user data`,
                user: userResponse,
                success: true
            })

    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file = req.file;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.userId  //middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (file) {
            const fileUri = getDataUrl(file);
            const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudinaryResponse.secure_url;
            user.profile.resumeOriginalname = file.originalname;
        }


        if (fullname) {
            user.fullname = fullname;
        }
        if (email) {
            user.email = email;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }

        if (skills) {
            user.profile.skills = skillsArray;
        }
        if (bio) {
            user.profile.bio = bio
        }
        await user.save();

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: `Profile updated successfully`,
            user: userResponse,
            success: true
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateProfilePicture = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId; // from authentication middleware

    if (!file) {
      return res.status(400).json({
        message: "No image file provided",
        success: false,
      });
    }

    // find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // convert file to data URI
    const fileUri = getDataUrl(file);

    // upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "profile_pictures",
      resource_type: "image",
    });

    // update profile picture fields
    user.profile.profilePhoto = cloudinaryResponse.secure_url;
    user.profile.profilePhotoOriginalname = file.originalname;

    await user.save();

    return res.status(200).json({
      message: "Profile picture updated successfully",
      profilePhoto: user.profile.profilePhoto,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
