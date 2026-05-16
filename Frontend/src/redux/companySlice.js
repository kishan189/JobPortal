import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companyList:[],
        searchCompanyByText:""
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
        },
        SetSearchCompanyByText: (state, action)=>{
            state.searchCompanyByText = action.payload
        }
    }
})

export const {setRegisterCompany,setSingleCompany,setAllCompanies,SetSearchCompanyByText} = companySlice.actions

export default companySlice.reducer