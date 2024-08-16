import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useDrawerContext } from "../../contexts/DrawerContext"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom"
import { useAppThemeContext } from "../../contexts/ThemeContext"



interface IMenuLateralProps {
    children: React.ReactNode
}

interface IListItemLinkProps {
    label: string,
    icon: string,
    to: string,
    onClose?: () => void
}


const ListItemLink: React.FC<IListItemLinkProps> = ({ icon, label, onClose, to }) => {

    const navigate = useNavigate()
    
    const handlerClose = () => {
        onClose?.()
        navigate(to)
    }
    // obtem informações de uma rota
    const resolvedPath =  useResolvedPath(to)
    // retorna informaçoes se for a rota atual
    const match = useMatch({path:resolvedPath.pathname, end:false}) 

    return (
        <ListItemButton onClick={handlerClose} selected={!!match}>
            <ListItemIcon>
                <Icon>
                    {icon}
                </Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    )
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {

    const theme = useTheme()

    const smDown = useMediaQuery(theme.breakpoints.down("sm"))
    
    const { drawerOpen, drawerOptions ,toggleDrawerOpen } = useDrawerContext()
    const {toggleTheme} = useAppThemeContext()

    return (
        <>
            <Drawer open={drawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(24)} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <Avatar
                            src="./assets/imgs/user(1).png"
                            sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
                        />
                        <p>Usuário</p>
                    </Box>

                    <Divider />

                    <Box flexGrow={1}>
                        <List>

                            {drawerOptions.map( option => {
                                return (
                                    <ListItemLink 
                                        to={option.to} 
                                        icon={option.icon} 
                                        label={option.label}
                                        onClose={smDown ? toggleDrawerOpen : undefined} 
                                    />
                                );
                            })}
                        </List>
                    </Box>

                    <Box>
                        <List>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    <Icon>
                                        dark_mode
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary="Alternar Tema" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    )

}


/* 
    ANOTACÇÕES
    ---------------------------------------------------------
    
    const theme = useTheme()
        useTheme: acessa as propriedades do tema da aplicação 

        theme.spacing(num): serve para definir tamanhos no miui 
        equivale a num * 4 pixels ( 28 * 4 = 112px)

        Theme.breakpoints : recurso que serve para verificar e aplicar regras com base 
        no tamnho da tela por parão o miui possui alguns tamanhos de tela parão(sm,xl,md,sl).
   
        ----------------------------------------------------------------
    COMPONENTE <Drawer>
        Drawer a propriedade variante define o estado do Drawer que pode ser
        "temporary": o menu pode ser aberto e fechado que pode ser controlado pela propriedade
        "permanent" o menu fica fixo

 */