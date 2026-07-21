import axios from "axios";

const api = axios.create({
  baseURL: "https://expenseflow-es56.onrender.com/api",
});

export default api;