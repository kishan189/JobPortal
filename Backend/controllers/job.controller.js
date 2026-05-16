import { Job } from "../modals/job.model.js";
export const postJob = async (req,res)=>{
    try{
        const {title, description, requirements, salary, location, jobType, position, companyId, experience} = req.body

        const userId = req.userId;
        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experience){
           return res.status(400).json({message:"Please fill all the inputs", status:false})
        }

        const formattedRequirements = Array.isArray(requirements)? requirements: requirements.split(",");


        const job = await Job.create({
            title, description, requirements: formattedRequirements
            , salary:Number(salary), location, jobType, position, company:companyId, experience,created_by:userId
        })
        return res.status(201).json({message:"Job posted successfully", status:true,job})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"internal server error", status:false})
    }
}


export const getAllJobs = async (req,res) =>{
    try{
        console.log("Getting all jobs...");
        const keyword = req.query.keyword || "";

        let query = {};
        
        if (keyword.trim() !== "") {
            query = {
                $or:[
                    {title: {$regex: keyword, $options:"i"}},
                    {description: {$regex: keyword, $options:"i"}},
                    // {location: {$regex: keyword, $options:"i"}},
                    // {jobType: {$regex: keyword, $options:"i"}},
                    // {position: {$regex: keyword, $options:"i"}},
                ]
            };
        }

        console.log("Query:", query);
        const jobs = await Job.find(query).populate({path:'company'}).sort({createdAt:-1});
        console.log("Found jobs:", jobs.length);
        
        if(!jobs || jobs.length === 0){
            return res.status(404).json({message:"No job found",status:false})
        }
        return res.status(200).json({jobs:jobs,status:true, message:"successfully jobs fetched"})


    }
    catch(error){
            console.log("Error in getAllJobs:", error.message);
            console.log("Full error:", error);
          return res.status(500).json({message:"Server error", status:false,data:[]})
    }
}

// For Users
export const getJobById = async (req,res) =>{
    try{

        const jobId = req.params.id
        const job = await Job.findById(jobId)
        .populate({
                path: "applications",
                select: "applicant -_id"  // only return applicant
            });
        if(!job){
            return res.status(404).json({message:"No job found",status:false})
        }
        return res.status(200).json({job,status:true})


    }
    catch(error){
          console.log(error)
          return res.status(500).json({message:"Server error", status:false})
    }
}

// Admin job created

export const getAdminJob = async (req,res)=>{
    try{
        const adminId = req.userId
        console.log("adminId✔",adminId)
        const jobs = await Job.find({created_by:adminId}).populate({path:"company",sort:{createdAt:-1}});

        console.log("jobs",jobs)
        if(!jobs){
            return res.status(404).json({message:"No job found",status:false})
        }
        return res.status(200).json({jobs,status:true})


    }
    catch(error){
        console.log(error)
         return res.status(500).json({message:"Server error", status:false})

    }
}