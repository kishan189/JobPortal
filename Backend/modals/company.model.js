import mongoose, { mongo } from "mongoose";

const companySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    website:{
        type:String,
       
    },
    location:{
        type:String,
        
    },
    logo:{
        type:String,
       
    },
    userId:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        }
    ],

},
{
    timestamps:true,
}
)

export const Company = mongoose.model("Company",companySchema)