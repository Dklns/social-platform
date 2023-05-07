import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/smp",
    withCredentials: true,
})

export default instance;