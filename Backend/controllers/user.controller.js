import { User } from "../modals/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
export const register = async (req, res)=>{
    try{

        const { fullname, email, phoneNumber, password, role } = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(404).json({
                message: "Missing required fields",
                success:false
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "Email already exists",
                success:false
            })
        }
        // convert password into hash

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password:hashPassword,
            role
        });
        await newUser .save()

        return res.status(200).json({
            message:`Account created successfully ${fullname}`,
            success:true,
        })

    }
    catch(error){
        console.log("error",error)
        res.status(400).json({
                message: "Missing required fields",
                success:false
        });
    }
}

export const login = async (req, res)=>{
    try{

        const {  email,  password } = req.body;
        if(!email ||  !password  ){
            return res.status(404).json({
                message: "Missing required fields",
                success:false
            });
        }
        
        // Find user by email
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success:false
            })
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(404).json({
                message:"Incorrect email or password",
                success:false,
            })
        }

        // generate token
       const tokenData = {
        userId: user._id,
       }
       const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
         expiresIn:"1d",
       })
       
       const userResponse = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role:user.role,
        profile: user.profile
       }
       return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000,
        httpOnly:true,
        sameSite: "strict"
       })
       .json({
        message:`Welcome back ${userResponse.fullname}`,
        user: userResponse,
        success:true
       })

    }
    
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            success:false
        });
    }
}


export const logout = async (req, res)=>{
    try{

       return res.status(200).cookie("token", "", {maxAge: 0})
       .json({
        message:`Logged out successfully`,
        success:true
       })

    }
    
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "Missing required fields",
            success:false
        });
    }
}


export const updateProfile = async (req, res)=>{
    try{

        const { fullname, email, phoneNumber, password, bio, skills } = req.body;
       
        let skillsArray;
        if(skills){
             skillsArray = skills.split(",");
        }
        const userId = req.userId  //middleware authentication
        let user = await User.findById(userId);
        if(!user){
             return res.status(404).json({
                message: "User not found",
                success:false
            });
        }

        // Hash the new password
        if(password){
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword

        }

        if(fullname){
            user.fullname = fullname;
        }
        if(email){
            user.email = email;
        }
        if(phoneNumber){
            user.phoneNumber = phoneNumber;
        }
        
        if(skills){
            user.profile.skills = skillsArray;
        }
        if(bio){
            user.profile.bio = bio
        }
        await user.save();

        const userResponse = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role:user.role,
        profile: user.profile
       }
       return res.status(200).json({
        message:`Profile updated successfully`,
        user: userResponse,
        success:true
       })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
            success:false
        });
    }
}