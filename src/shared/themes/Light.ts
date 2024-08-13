import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

// Criação de um tema personalizado utilizando o Material UI
export const LightTheme = createTheme({
    palette: {
        primary: {
            // Cor principal do tema. Aqui, a cor amarela com tonalidade 700 é utilizada.
            main: yellow["700"], 
            // Versão mais escura da cor principal para estados como 'hover' ou 'ativo'.
            dark: yellow["800"], 
            // Versão mais clara da cor principal para estados como 'focado' ou 'inativo'.
            light: yellow["500"], 
            // Cor do texto que será utilizado em elementos que têm a cor principal de fundo. 
            // Neste caso, o texto será branco.
            contrastText: "#ffffff"
        },

        secondary: {
            // Cor secundária do tema. A cor ciano com tonalidade 500 é utilizada.
            main: cyan["500"], 
            // Versão mais escura da cor secundária.
            dark: cyan["400"], 
            // Versão mais clara da cor secundária.
            light: cyan["300"], 
            // Cor do texto que será utilizado em elementos que têm a cor secundária de fundo. 
            // Aqui, o texto também será branco.
            contrastText: "#ffffff"
        },

        background: {
            // Cor padrão de fundo dos componentes, como o body do documento.
            default: "#f7f6f3", 
            // Cor de fundo para elementos que utilizam um fundo de papel, como cards.
            paper: "#ffffff" 
        }
    }
});
