/* eslint-disable prettier/prettier */

import axiosClient from "./axiosClient";

const authApi = {
  getAuthByEmailAndPassword: (email, password) => {
    const url = "/users/login";
    return axiosClient.post(url, { email: email, password: password });
  },
};
export default authApi;