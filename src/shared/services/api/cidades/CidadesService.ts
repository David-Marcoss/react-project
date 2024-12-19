import { Environment } from "../../../environments"
import { Api } from "../axios-config"


export interface ICidades{
    id: string
    name: string
}

export interface ICidadesList{
    cidades: ICidades[]
    totalCount: number
}

const getAll = async(page=1, filter=""): Promise<ICidadesList | Error> => {

    try {
        const searchUrl = `/cidades?_page=${page}&_per_page=${Environment.LIST_ITEMS_LIMIT}&name=${filter}`

        const {data} = await Api.get(searchUrl)

        return {
            cidades: data.data,
            totalCount:  data.items || Environment.LIST_ITEMS_LIMIT
        }
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao buscar registros")
    }
}

const getById = async(id:string): Promise<ICidades | Error> => {

    try {
        const {data} = await Api.get(`/cidades/${id}`)

        if (data) return data

        return new Error("Cidade não encontrada")
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao buscar registro")
    }
}

const create = async(dataCidade:Omit<ICidades,"id">): Promise<string | Error> => {

    try {
        const {data} = await Api.post<ICidades>("/cidades",dataCidade)

        return data.id
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao criar registro")
    }
}

const deleteById = async (id:string): Promise<void | Error> => {

    try {
        const searchUrl = `/cidades/${id}`
        await Api.delete(searchUrl)

        return
        
    } catch (error: any) {
        console.log(error)
        return new Error(error.menssage || "Erro ao deletar registro")
    }
}

const updateById = async (id:string, data:Omit<ICidades,"id">): Promise<void | Error> => {

    try {
        await Api.put(`/cidades/${id}`,data)

        return
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao atualizar registro")
    }
}


export const CidadesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}