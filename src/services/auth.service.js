import axios from "axios";
const AUTH_LOCAL_STORAGE_KEY = "token";
const baseUrl = process.env.REACT_APP_API_URL;

const LOGIN = `${baseUrl}/api/adminlogin`;
const GET_CURRENT_USER = `${baseUrl}/api/getCurrentRole`;

export const getAuth = () => {
  if (!localStorage) {
    return;
  }

  const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const token = lsValue;

    if (token) {
      // You can easily check auth_token expiration also
      return { token };
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

export const login = async (data) => {
  return axios.post(`${LOGIN}`, data, {});
};

export const getCurrentUser = (token) => {
  return axios.get(`${GET_CURRENT_USER}`, {
    headers: {
      Authorization: token || getAuth()?.token,
    },
  });
};
