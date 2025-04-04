import axios from "axios";

const taskapi = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5002" : "",
    withCredentials: true, // Important for sending/receiving cookies
});

export default taskapi