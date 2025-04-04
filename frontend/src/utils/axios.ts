import axios from "axios";

const taskapi = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://notes-production-a37c.up.railway.app" : "",
    withCredentials: true, // Important for sending/receiving cookies
});

export default taskapi