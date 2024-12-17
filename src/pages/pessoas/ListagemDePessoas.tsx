import { useNavigate, useSearchParams } from "react-router-dom"
import { FerramentasDeListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { useEffect, useMemo, useState } from "react"
import { IPessoas, PessoasService } from "../../shared/services/api/pessoas/PessoasService"
import { useDebounce } from "../../shared/hooks"
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { Environment } from "../../shared/environments"


export const ListagemDePessoas:React.FC = () => {

    const [searchParams,setSearchParams] = useSearchParams()

    const [rows,setRows] = useState<IPessoas[]>([])
    const [totalCount,setTotalCount] = useState(0)
    const [isloading,setIsLoading] = useState(true)

    const navigate = useNavigate()

    const debounce = useDebounce(300)

    const busca = useMemo( () => {
        return searchParams.get("busca") || ""
    },[searchParams])

    const pagina = useMemo( () => {
        return searchParams.get("pagina") || "1"
    },[searchParams])

    useEffect(() => {
        setIsLoading(true)
        debounce(() => {
            PessoasService.getAll(Number(pagina), busca).then(result => {
                if (result instanceof Error) alert(result.message)
                else{
                    console.log(result)
                    setRows(result.pessoas)
                    setTotalCount(result.totalCount)
                    setIsLoading(false)
                }
            })
        })
    }, [busca, pagina,debounce])

    const handleDelete = (id : string) => {
        // eslint-disable-next-line no-restricted-globals
        const userConfirmed = confirm("tem certeza que deseja apoagar o registro?")

        if(userConfirmed){
            PessoasService.deleteById(id).then( (result) => {
                if( result instanceof Error){
                    console.log(result)
                    alert("Erro ao deletar registro !!")
                }
                else{
                    alert("Registro deletado com sucesso !!")
                    setRows( rows => rows.filter( row => row.id !== id))
                }
            })
        }
    }

    return (
        <LayoutBaseDePagina 
            titulo="Pessoas" 
            barraDeFerramentas={
            <FerramentasDeListagem 
                mostrarInputBusca
                textoBotao="Adicionar Pessoa"
                clicarBotao={() => navigate("/pessoas/detalhe/nova")}
                textoDeBusca={busca}
                mudarTextoDeBusca={texto => setSearchParams({busca:texto, pagina:"1"},{replace:true})} />
            }>

            <TableContainer component={Paper} variant="outlined" sx={{ m:1, width: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Ações
                            </TableCell>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                E-mail
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                   <IconButton 
                                        size="small"
                                        onClick={() => navigate("/pessoas/detalhe/" + row.id)}
                                    >
                                        <Icon>
                                            edit
                                        </Icon>
                                   </IconButton>
                                   <IconButton 
                                        size="small"
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        <Icon>
                                            delete
                                        </Icon>
                                   </IconButton>
                                </TableCell>
                                <TableCell>
                                    {row.nomeCompleto}
                                </TableCell>
                                <TableCell>
                                    {row.email}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        {isloading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate"/>
                                </TableCell>
                            </TableRow>
                        )}

                        {totalCount > Environment.LIST_ITEMS_LIMIT && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        count={Math.ceil(totalCount/ Environment.LIST_ITEMS_LIMIT)}
                                        onChange={ (event, newPage) => setSearchParams({busca, pagina: newPage.toString()},{replace:true})}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>

                    { rows.length === 0 && !isloading && (
                        <caption>Nenhum Registro Encontrado</caption>
                    )}
                </Table>
            </TableContainer>

        </LayoutBaseDePagina>
    )
}