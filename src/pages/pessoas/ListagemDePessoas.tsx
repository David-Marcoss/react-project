import { useSearchParams } from "react-router-dom"
import { FerramentasDeListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { useEffect, useMemo } from "react"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { useDebounce } from "../../shared/hooks"


export const ListagemDePessoas:React.FC = () => {

    const [searchParams,setSearchParams] = useSearchParams()

    const debounce = useDebounce(300)

    const busca = useMemo( () => {
        return searchParams.get("busca") || ""
    },[searchParams])

    useEffect(() => {
        debounce(() => {
            PessoasService.getAll(1, busca).then(result => {
                if (result instanceof Error) alert(result.message)
                else
                    console.log(result)

            })

        })
    }, [busca, debounce])

    return (
        <LayoutBaseDePagina 
            titulo="Pessoas" 
            barraDeFerramentas={
            <FerramentasDeListagem 
                mostrarInputBusca
                textoBotao="Adicionar Pessoa"
                textoDeBusca={busca}
                mudarTextoDeBusca={texto => setSearchParams({busca:texto},{replace:true})} />
            }>

            <div>
                Listagem de cidades
            </div>

        </LayoutBaseDePagina>
    )
}