import axios from "axios";

export default axios.create({
  baseURL: "http://sysver.local/api/api/",
  withCredentials: true,
  browserBaseURL: 'http://'
})
