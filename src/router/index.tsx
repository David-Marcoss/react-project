import { Navigate, Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import { useDrawerContext } from "../shared/contexts/DrawerContext"
import { Dashboard } from "../pages/dashboard/Dashboard"
import { DetalhesDePessoas, ListagemDePessoas } from "../pages/pessoas"


export const RoutesApp = () => {
    const {setDrawerOptions} = useDrawerContext()

    useEffect( () => {
        setDrawerOptions([
            {
                to: "/",
                icon: "home",
                label: "pagina-inicial"
            },
            {
                to: "/pessoas",
                icon: "people",
                label: "pessoas"
            }
        ])
    })

    return(
        <Routes>
            <Route path="/home" element={<Dashboard/>} />

            <Route path="/pessoas" element={<ListagemDePessoas/>} />
            <Route path="/pessoas/detalhe/:id" element={<DetalhesDePessoas/>} />

            <Route path="*" element={<Navigate to="/home"/>} />
        </Routes>
    )
}