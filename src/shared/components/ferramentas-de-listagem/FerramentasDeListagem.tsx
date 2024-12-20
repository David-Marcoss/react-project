import { Box, Button, Icon, Paper, TextField, Typography, useTheme } from "@mui/material"

interface IFerramentasDeListagemPros {
    textoDeBusca?: string,
    mostrarInputBusca?: boolean,
    mudarTextoDeBusca?: (texto: string) => void,
    textoBotao?: string
    mostrarBotao?: boolean
    clicarBotao?: () => void
}



export const FerramentasDeListagem: React.FC<IFerramentasDeListagemPros> = ({
    clicarBotao,
    mostrarBotao = true,
    mostrarInputBusca = false,
    mudarTextoDeBusca,
    textoBotao = "Novo",
    textoDeBusca = ""
}) => {
    const theme = useTheme()

    return (
        <Box
            component={Paper}
            display={"flex"}
            alignItems={"center"}
            marginX={1}
            padding={1}
            paddingX={2}
            gap={1}
            height={theme.spacing(5)}
        >
            {mostrarInputBusca &&
                (<TextField size="small"
                    placeholder="Pesquisar"
                    value={textoDeBusca}
                    onChange={e => mudarTextoDeBusca?.(e.target.value)}
                />)
            }

            <Box
                flex={1}
                display={"flex"}
                justifyContent={"end"}
            >
                {
                    mostrarBotao && (
                        <Button
                            color="primary"
                            disableElevation //retira sombras
                            variant="contained"
                            endIcon={<Icon>add</Icon>}
                            onClick={clicarBotao}
                        >
                            <Typography variant="button" textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace="nowrap">
                                {textoBotao}
                            </Typography>
                        </Button>
                    )
                }
            </Box>
        </Box>
    )
}
