import { CircularProgress, Grid, Paper, Typography } from "@mui/material"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"
import { useEffect, useState } from "react"
import { CidadesService } from "../../shared/services/api/cidades/CidadesService"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"


export const Dashboard = () => {
    const [totalPessoas,setTotalPessoas] = useState<number>(0)
    const [totalCidades,setTotalCidades] = useState<number>(0)
    
    const [isLoadingPessoas,setIsLoadingPessoas] = useState(true)
    const [isLoadingCidades,setIsLoadingCidades] = useState(true)

    useEffect(()=>{
        setIsLoadingCidades(true)
        setIsLoadingPessoas(true)

        CidadesService.getAll().then(result => {
            if (result instanceof Error) alert(result.message)
            else {
                setTotalCidades(result.totalCount)
                setIsLoadingPessoas(false)
            }
        })

        PessoasService.getAll().then(result => {
            if (result instanceof Error) alert(result.message)
            else {
                setTotalPessoas(result.totalCount)
                setIsLoadingCidades(false)
            }
        })
    },[])

    return (
        <LayoutBaseDePagina
            titulo="Dashboard"
        >   
            <hr />
            <Grid direction="row" container spacing={4} margin={2} >
                <Grid
                    item
                    component={Paper}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    margin={2}
                    padding={3}
                    height={250}
                    xs={10}
                    lg={4}
                >
                    <Typography variant="h4" marginBottom={3}> Total de Cidades</Typography>
                    { isLoadingCidades ? 
                        <CircularProgress size={40}/> :
                        <Typography variant="h3">{totalCidades}</Typography>
                    }
                </Grid>

                <Grid
                    item
                    component={Paper}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height={250}
                    padding={4}
                    margin={2}
                    xs={10}
                    lg={4}
                >
                    <Typography variant="h4" marginBottom={3}> Total de Pessoas</Typography>
                    { isLoadingPessoas ? 
                        <CircularProgress size={40}/> :
                        <Typography variant="h3">{totalPessoas}</Typography>
                    }

                </Grid>

            </Grid>
        </LayoutBaseDePagina>
    )
}