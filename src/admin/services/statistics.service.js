import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const GET_STATISTICS = `${baseUrl}/api/getStatistics`;


export const getStatistics = async () => {

  return axios.get(`${GET_STATISTICS}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};