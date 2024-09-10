import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environments";

export const Api = axios.create({
    baseURL: Environment.API_URL
})

Api.interceptors.response.use(
    response => responseInterceptor(response),
    error => errorInterceptor(error)
)