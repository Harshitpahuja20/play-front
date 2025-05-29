import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_BALANCE= `${baseUrl}/api/addBalance`;
const VIEW_CARDS = `${baseUrl}/api/getAdminCards`;

export const addBalance = async (data) => {
  return axios.post(`${ADD_BALANCE}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getCards = async (page = 1, filters) => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", Infinity);

  const [startDate, endDate] = filters?.dateRange || [];

  if (startDate) {
    params.append("start_date", startDate.toISOString());
  }
  if (endDate) {
    params.append("end_date", endDate.toISOString());
  }
  if (filters?.status) {
    params.append("status", filters.status);
  }
  if (filters?.userId) {
    params.append("userId", filters.userId);
  }

  return axios.get(`${VIEW_CARDS}?${params.toString()}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
