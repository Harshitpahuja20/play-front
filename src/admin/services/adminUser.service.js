import axios from "axios";
import { getAuth } from "../../services/auth.service";

const baseUrl = process.env.REACT_APP_API_URL;

const ADD_USERS= `${baseUrl}/api/admin/user/create`;
const UPDATE_USERS = `${baseUrl}/stream/update`;
const VIEW_USERS = `${baseUrl}/api/admin/getAllSubadmin`;
const VIEW_USERS_FOR_SUBADMIN = `${baseUrl}/api/subadmin/users`;
const MY_USERS_FOR_SUBADMIN = `${baseUrl}/api/subadmin/getSubAdminUsers`;
const DELETE_USERS = `${baseUrl}/stream/delete`;

export const addUser = async (data) => {
  return axios.post(`${ADD_USERS}`, data, {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getUsers = async (page = 1, filters) => {
  return axios.get(`${VIEW_USERS}` , {
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

export const getUsersforSubAdmin = async (query) => {
  return axios.get(`${VIEW_USERS_FOR_SUBADMIN}?q=${query}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};

export const getSubAdminUsers = async () => {
  return axios.get(`${MY_USERS_FOR_SUBADMIN}` , {
    headers: {
      Authorization: getAuth()?.token,
    },
  });
};