import axios from "axios";
const API = "https://ensolver-note-app-71c4eb0b6457.herokuapp.com/";

const apiService = axios.create({
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default apiService;

