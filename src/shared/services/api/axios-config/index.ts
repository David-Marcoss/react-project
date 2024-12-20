import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environments";

export const Api = axios.create({
    baseURL: Environment.API_URL,
    // headers: {
    //     "Authorization": "Bearer " + localStorage.getItem("APP_KEY_AUTH_TOKEN")
    // }
})

Api.interceptors.response.use(
    response => responseInterceptor(response),
    error => errorInterceptor(error)
)