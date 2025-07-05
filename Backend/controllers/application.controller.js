import { Application } from "../modals/application.model.js"
import { Job } from "../modals/job.model.js"

export const applyJob = async (req,res)=>{
 try{
    const userId = req.userId
    const id = req.params.id
    console.log(userId, id)
    if(!id){
        return res.status(400).json({message:"Invalid job id",success:false})
    }
    const existingApplication = await Application.findOne({job:id,applicant:userId});
    console.log("existingApplication",existingApplication)
    if(existingApplication){
        return res.status(400).json({message:"You have already applied for this job", success:false})
    }

    // check if job is exit or not

    const job = await Job.findById(id);
    console.log("job",job)

    if(!job){
        return res.status(404).json({message:"Job not found", success:false})
    }
    // create new application
    const newApplication = await Application.create({job:id, applicant:userId});
    job.applications.push(newApplication._id)
    await job.save();
    return res.status(201).json({message:"Application submitted", success:true});
    
 }
 catch(error){
    console.log(error)
     return res.status(500).json({message:"error", success:false});
    

 }
}



export const getAppliedJobs = async (req, res) =>{
    try{
       const userId = req.userId
       console.log("userId",userId)
       const applications = await Application.find({applicant:userId})
       .sort({createdAt:-1})
       .populate({path:"job", options:{sort:{createdAt:-1}},
        populate:{path:"company", options:{sort:{createdAt:-1}}}
    });
       console.log("applications",applications)
      if(!applications){
        return res.status(400).json({message:"No applications found", success:false})
      }
      return res.status(200).json({applications, success:true})
    }
    catch(error){
        console.log("error",error)
          return res.status(500).json({message:"internal server error", success:false});

    }
}


export const getApplicants = async (req, res) =>{
    try{
       const jobId = req.params.id
       console.log("jobId",jobId)
       const job = await Job.findById(jobId).populate({path:"applications", options:{sort:{createdAt:-1}},
        populate:{path:"applicant",options:{sort:{ createdAt:-1}}}});
       if(!job){
        return res.status(400).json({message:"Job not found",success:false})
       }
       return res.status(200).json({job, success:true})
    }
    catch(error){
        console.log("error",error)
          return res.status(500).json({message:"internal server error ", success:false});

    }
}

export const updateStatus = async (req, res) =>{
    try{
       const {status} = req.body
       const applicationId = req.params.id;

       if(!status){
        return res.status(400).json({message:"Invalid status",success:false})
       }
       // find the application by applicant id
       const application = await Application.findById({_id:applicationId})
       if(!application){
        return res.status(400).json({message:"Application not found", success:false})
       }
       // update the status
       application.status = status.toLowerCase();
       await application.save()
       return res.status(200).json({message:"Application status updated", success:true})
    }
    catch(error){
        console.log("error",error)
          return res.status(500).json({message:"internal server error submitted", success:true});

    }
}
