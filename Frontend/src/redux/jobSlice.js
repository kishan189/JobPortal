
import { fetchAllJobsService, getJobById } from "@/services/getAllJobsSevice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching all jobs
export const fetchAllJobs = createAsyncThunk(
  "job/fetchAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllJobsService();
    //   console.log("",data)
      if (data?.status) {
        return data.jobs; // Assuming API returns { status: true, jobs: [...] }
      } else {
        return rejectWithValue(data?.message || "Failed to fetch jobs");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
    "job/ByID", 
    async (jobId, {rejectWithValue})=>{
        try{
            const data = await getJobById(jobId)
            if(data?.status){
                return data
            }
            else{
                return rejectWithValue(data?.message || "Failed to fetch the data")
            }

        }
        catch(error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }

    }
)


// Slice
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    loading: false,
    error: null,
    jobDetails:null
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAppliedJob : (state, action)=>{
      const  { jobId, applicationId } = action.payload
      if (state.jobDetails?.job?._id === jobId) {
        if (!state.jobDetails.job.applications) {
          state.jobDetails.job.applications = [];
        }
        state.jobDetails.job.applications.push(applicationId);
      }      // state.allJobs = state?.allJobs?.map((job,index)=>{
      //   if(job?._id===jobId){
      //      job.applications.push(jobId)
      //   }
      // })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetails = action.payload?.job;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAllJobs, setAppliedJob } = jobSlice.actions;
export default jobSlice.reducer;
