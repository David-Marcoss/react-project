import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./router";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { MenuLateral } from "./shared/components/menu-lateral/MenuLateral";
import { DrawerProvider } from "./shared/contexts/DrawerContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
      
      <DrawerProvider>
        <MenuLateral>
          <RoutesApp/>
        </MenuLateral>
      </DrawerProvider>

      </BrowserRouter>
    </AppThemeProvider>
  );
}

