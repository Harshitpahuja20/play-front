import axios from "axios";
import { getAuth } from "./auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const FRANCHISE_REQUEST = `${baseUrl}/api/franchiseRequest/create`;

export const franchiseRequest = async (data) => {
  return axios.post(`${FRANCHISE_REQUEST}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
