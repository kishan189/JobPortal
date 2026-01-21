import apiInterceptor from "@/utils/apiInterceptor"
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data"

export const fetchAllJobsService = async () => {
  const res = await apiInterceptor.get(`${JOB_API_ENDPOINT}/getJobs`);
  return res?.data; // return only data for simplicity
};


export const getJobById = async (jobId) => {
    try {
        const res = await apiInterceptor.get(`${JOB_API_ENDPOINT}/get/${jobId}`);

        return res.data;
    } catch (err) {
        throw err;
    }
};

export const applyJob = async (jobId) => {
    try {
        const res = await apiInterceptor.get(
             `${APPLICATION_API_ENDPOINT}/apply/${jobId}`
        );

        return res.data;
    } catch (err) {
        throw err;
    }
};
