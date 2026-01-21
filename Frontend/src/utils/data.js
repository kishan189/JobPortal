const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5171/api";

export const USER_API_ENDPOINT = `${API_BASE_URL}/users`;

export const JOB_API_ENDPOINT = `${API_BASE_URL}/jobs`;

export const COMPANY_API_ENDPOINT = `${API_BASE_URL}/company`;

export const APPLICATION_API_ENDPOINT = `${API_BASE_URL}/application`;