/* eslint-disable prettier/prettier */
import axios from "axios";
import firebase from "firebase/compat";
// import queryString from "query-string";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

// eslint-disable-next-line no-unused-vars
const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    return currentUser.getIdToken();
  }
};
const getToken = async () => {
  const token = localStorage.getItem("token");
  if (token) return token;
};
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
