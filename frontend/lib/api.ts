import axios from "axios";
// import { BackendUrl } from "./utils";

const api = axios.create({
  //   baseURL: BackendUrl,
  withCredentials: true,
});

export default api;
