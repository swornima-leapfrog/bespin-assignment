import axios from "axios";
import config from "~/config";

const getToken = () => {
  const token = localStorage.getItem("token");

  return token;
};

const http = axios.create({
  baseURL: config.apiBaseURL
});

// Add a request interceptor
http.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default http;
