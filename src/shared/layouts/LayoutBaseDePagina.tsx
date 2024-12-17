import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useDrawerContext } from "../contexts/DrawerContext"


interface ILayoutBaseDePaginaProps{
    titulo: string,
    barraDeFerramentas?: React.ReactNode,
    children: React.ReactNode
}

export const LayoutBaseDePagina:React.FC<ILayoutBaseDePaginaProps> = ( {titulo, children, barraDeFerramentas}) => {

    const theme = useTheme()

    const { toggleDrawerOpen} = useDrawerContext()
    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))


    return(
        <Box height="100%" display={"flex"} flexDirection={"column"} gap={1}>
            <Box 
                display={"flex"}
                alignItems={"center"}
                margin={2}
                height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} 
            >
                {
                    smDown &&
                    (<IconButton onClick={toggleDrawerOpen}>
                            <Icon>menu</Icon>
                    </IconButton>)
                    
                }

                {/*Typography elemento utilizando para renderizar componentes de texto  */}
                <Typography 
                    overflow={"hidden"} 
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    variant={ smDown ? "h5" : mdDown ? "h4" : "h3" }
                >
                    {titulo}
                </Typography>
            </Box>

            {
                barraDeFerramentas &&
                (
                    <Box>
                        {barraDeFerramentas}
                    </Box>
                )
            }

            <Box flex={1} overflow={"hidden"}>
                {children}
            </Box>
            
        </Box>
    )
}