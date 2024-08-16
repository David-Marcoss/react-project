import { Navigate, Route, Routes } from "react-router-dom"
import { Home, Products } from "../pages"
import { useEffect } from "react"
import { useDrawerContext } from "../shared/contexts/DrawerContext"
import { Dashboard } from "../pages/dashboard/Dashboard"


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
                to: "/produtos",
                icon: "product",
                label: "produtos"
            }
        ])
    })

    return(
        <Routes>
            <Route path="/home" element={<Dashboard/>} />
            <Route path="/produtos" element={<Products/>} />

            <Route path="*" element={<Navigate to="/home"/>} />
        </Routes>
    )
}