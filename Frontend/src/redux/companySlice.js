import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companyList:[]
    },
    reducers:{
        setRegisterCompany :(state, action)=>{
            console.log("action.payload>>",action.payload)
            state.singleCompany = action.payload
        },
        setSingleCompany: ( state, action)=>{
           state.singleCompany =action.payload
        },
        setAllCompanies : (state, action) =>{
            state.companyList = action.payload
        }
    }
})

export const {setRegisterCompany,setSingleCompany,setAllCompanies} = companySlice.actions

export default companySlice.reducer