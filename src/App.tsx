import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./router";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { MenuLateral } from "./shared/components/menu-lateral/MenuLateral";
import { DrawerProvider } from "./shared/contexts/DrawerContext";

import "./shared/forms/TranslationsYup"
import { AuthProvider } from "./shared/contexts/AuthContext";
import { Login } from "./shared/components/login/login";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <BrowserRouter>

            <DrawerProvider>
              <MenuLateral>
                <RoutesApp />
              </MenuLateral>
            </DrawerProvider>

          </BrowserRouter>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
}

