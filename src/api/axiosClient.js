// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:5000/api", // change to your backend
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Optional: Add interceptors
// axiosClient.interceptors.request.use((config) => {
//   // Example: attach token if exists
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosClient;