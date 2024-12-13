import { FerramentasDeListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"


export const Dashboard = () => {

    return (
        <LayoutBaseDePagina
            titulo="Dashboard"
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarInputBusca={true}
                />
            }
        >
            sauble
        </LayoutBaseDePagina>
    )
}