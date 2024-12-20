import { Api } from "../axios-config"


export interface IAuthData {
    email: string,
    password: string
}

interface IAuth {
    authToken: string,
}

export const AuthService = {

    auth: async (data: IAuthData): Promise<IAuth | Error> => {

        try {
            const result  = await Api.get(`/auth`)

            if (result.data ) return result.data

            return new Error("Erro ao fazer login !!")

        } catch (error: any) {
            return new Error(error.menssage || "Erro ao fazer login !!")
        }
    }
}
