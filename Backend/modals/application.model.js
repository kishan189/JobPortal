import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        require:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    status:{
        type:String,
        enum:["pending", "accepted","rejected"],
        default:"pending"
    },
   
},
{timestamp:true}
)

export const Application = mongoose.model("Application",applicationSchema)