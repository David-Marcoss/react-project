import { Environment } from "../../../environments"
import { Api } from "../axios-config"


export interface IPessoas{
    id: string
    nomeCompleto: string
    email: string
    cidadeId: string
}

export interface IPessoasList{
    pessoas: IPessoas[]
    totalCount: number
}

const getAll = async(page=1, filter=""): Promise<IPessoasList | Error> => {

    try {

        const searchUrl = `/pessoas?_page=${page}&_per_page=${Environment.LIST_ITEMS_LIMIT}&nomeCompleto=${filter}`

        const {data} = await Api.get(searchUrl)

        return {
            pessoas: data.data,
            totalCount:  data.items || Environment.LIST_ITEMS_LIMIT
        }
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao buscar registros")
    }
}

const getById = async(id:string): Promise<IPessoas | Error> => {

    try {
        const {data} = await Api.get(`/pessoas/${id}`)

        if (data) return data

        return new Error("Pessoa não encontrada")
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao buscar registro")
    }
}

const create = async(dataPessoa:Omit<IPessoas,"id">): Promise<string | Error> => {

    try {

        const {data} = await Api.post<IPessoas>("/pessoas",dataPessoa)

        return data.id
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao criar registro")
    }
}

const deleteById = async (id:string): Promise<void | Error> => {

    try {

        const searchUrl = `/pessoas/${id}`
        await Api.delete(searchUrl)

        return
        
    } catch (error: any) {
        console.log(error)
        return new Error(error.menssage || "Erro ao deletar registro")
    }
}

const updateById = async (id:string, data:Omit<IPessoas,"id">): Promise<void | Error> => {

    try {
        await Api.put(`/pessoas/${id}`,data)

        return
        
    } catch (error: any) {
        return new Error(error.menssage || "Erro ao atualizar registro")
    }
}


export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}