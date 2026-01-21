import apiInterceptor from "@/utils/apiInterceptor"
import { JOB_API_ENDPOINT } from "@/utils/data"

export const fetchAllJobsService = async () => {
  const res = await apiInterceptor.get(`${JOB_API_ENDPOINT}/getJobs`);
  return res?.data; // return only data for simplicity
};


export const getJobById = async (jobId) => {
    try {
        const res = await apiInterceptor.get(
             `http://localhost:5171/api/jobs/get/${jobId}`
        );

        return res.data;
    } catch (err) {
        throw err;
    }
};

export const applyJob = async (jobId) => {
    try {
        const res = await apiInterceptor.get(
            // `http://localhost:5171/api/jobs/get/${jobId}`
             `http://localhost:5171/api/application/apply/${jobId}`
        );

        return res.data;
    } catch (err) {
        throw err;
    }
};
