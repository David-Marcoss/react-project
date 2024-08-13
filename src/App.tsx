import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./router";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <RoutesApp/>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

