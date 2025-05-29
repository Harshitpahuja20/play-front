import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const UPDATE_ROUNDS_RESULT = `${baseUrl}/api/updateResult`;
const VIEW_ROUNDS = `${baseUrl}/api/getAllRounds`;


export const getRounds = async (filters) => {
    const params = new URLSearchParams();
    console.log(`filter ${JSON.stringify(filters)}`)
    if (filters?.date) {
      // Send ISO date string (e.g., '2025-05-15')
      params.append("date", new Date(filters.date).toISOString().split("T")[0]);
    }
  
    return axios.get(`${VIEW_ROUNDS}?${params.toString()}`, {
      headers: {
        Authorization: getAuth()?.token,
      },
    });
  };
  

export const updateRoundResult = async (data) => {
  return axios.put(`${UPDATE_ROUNDS_RESULT}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
