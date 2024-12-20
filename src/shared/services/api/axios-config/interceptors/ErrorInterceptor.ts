import {AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    
    if (error.response?.status === 401){
        console.log("wdoqwnjid")
        localStorage.removeItem("APP_KEY_AUTH_TOKEN")
        return Promise.reject( new Error("Usuario não autenticado"))
    }

    return Promise.reject(error)


}