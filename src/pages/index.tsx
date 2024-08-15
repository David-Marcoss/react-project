

import { Button } from "@mui/material";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";
import { useDrawerContext } from "../shared/contexts/DrawerContext";


export const Home = () => {
  const { toggleTheme } = useAppThemeContext();
  const {toggleDrawerOpen} = useDrawerContext()
  
  return (
    <div className="Home">
      <Button variant="contained" color="primary" onClick={toggleTheme}>
        Hello world
      </Button>

      <Button variant="contained" color="secondary" onClick={toggleDrawerOpen}>
        Abrir Menu
      </Button>
    </div>
  );
}

export const Products = () => {
  
  return (
    <div className="Home">
      <h1>Produtos</h1>
    </div>
  );
}
  