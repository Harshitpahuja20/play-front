import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_USERS= `${baseUrl}/api/stream/create`;
const UPDATE_USERS = `${baseUrl}/api/stream/update`;
const VIEW_USERS = `${baseUrl}/api/getAllUsers`;
const DELETE_USERS = `${baseUrl}/api/stream/delete`;

export const addUser = async (data) => {
  return axios.post(`${ADD_USERS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getUsers = async (page = 1, filters) => {
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

  return axios.get(`${VIEW_USERS}?${params.toString()}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const deleteUsers = async (id) => {
  return axios.delete(`${DELETE_USERS}/${id}`, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const updateUser = async (data) => {
  return axios.put(`${UPDATE_USERS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};
