import { FerramentasDeListagem } from "../../shared/components"
import { FerramentasDeDetalhes } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetahes"
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina"



export const Dashboard = () => {

    return (
        <LayoutBaseDePagina
            titulo="Dashboard"
            barraDeFerramentas={
                // <FerramentasDeListagem
                //     mostrarInputBusca={true}
                // />

                <FerramentasDeDetalhes/>
            }
        >
            sauble
        </LayoutBaseDePagina>
    )
}