import axios from "axios";
const axiosFetch = axios.create({
  // baseURL: process.env.backendUrl,
  baseURL: "http://localhost:8080",
  timeout: 8000,
});
export { axiosFetch };
