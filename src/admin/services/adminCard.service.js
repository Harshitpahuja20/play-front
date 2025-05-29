import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_CARDS= `${baseUrl}/api/stream/create`;
const UPDATE_CARDS = `${baseUrl}/api/stream/update`;
const VIEW_CARDS = `${baseUrl}/api/getAdminCards`;
const DELETE_CARDS = `${baseUrl}/api/stream/delete`;

export const addCard = async (data) => {
  return axios.post(`${ADD_CARDS}`, data, {
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

export const deleteCards = async (id) => {
  return axios.delete(`${DELETE_CARDS}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateCard = async (data) => {
  return axios.put(`${UPDATE_CARDS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
