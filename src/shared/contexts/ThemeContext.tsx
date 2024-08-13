import { ThemeProvider } from "@emotion/react";
import { useCallback, useContext, useMemo, useState } from "react";
import { createContext } from "react";
import { DarkTheme, LightTheme } from "../themes";
import { Box } from "@mui/material"; // Importação de Box do Material UI

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

interface IThemeContextProp {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IThemeContextProp> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    themeName === "light" ? setThemeName("dark") : setThemeName("light");
  }, [themeName]);

  const theme = useMemo(() => {
    return themeName === "light" ? LightTheme : DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
