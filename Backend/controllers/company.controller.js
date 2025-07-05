import { Company } from "../modals/company.model.js";

export const registerCompany = async (req, res) =>{
    try{
           const {companyName} = req.body;
           if(!companyName){
            return res.status(400).json({message:"Company name is requires"})
           }
           let company = await Company.findOne({name:companyName})

           if(company){
            return res.status(400).json({message: "Company already exists"})
           }

            company = await Company.create({
                name: companyName,
                userId: req.userId
            })

            return res.status(201).json({
                message:"Company created successfully",
                company,
                success:true
            })

    }
    catch(error){
      console.log(error)
    }
}


export const getAllCompanies = async (req, res)=>{
    try{
       
        const userId = req.id;
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({message:"No company found"})
        }
        return res.status(200).json({companies:companies,success:true})
    }
    catch(error){
      console.log(error)
    }
}

export const getCompanyById = async (req, res) =>{
    try{
       
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        console.log("company",company)
        if(!company){
            return res.status(404).json({message:"company not found"})
        }
        return res.status(200).json({company, success:true})
    }
    catch(error){
      console.log(error)
    }
}


export const updateCompany = async (req, res) => {
    try{
       
        const {name, description, website , location} = req.body
        const file = req.file
        const updateData = {name, description, website, location};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new:true
        })
        if(!company){
           return res.status(404).json({message:"company not found"})

        }
        return res.status(200).json({message:"company updated"})
    }
    catch(error){
      console.log(error)
    }
}