import axios from "axios";
import { getAuth } from "./auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const CONTACT_US = `${baseUrl}/api/contactQuery/create`;
const STUDENT_QUERY = `${baseUrl}/api/contactQuery/create`;

export const contactUs = async (data) => {
  return axios.post(`${CONTACT_US}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const studentQuery = async (data) => {
  return axios.post(`${STUDENT_QUERY}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
