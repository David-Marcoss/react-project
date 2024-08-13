import { Button } from "@mui/material";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";


export const Home = () => {

  const { toggleTheme } = useAppThemeContext()

    return (
      <div className="Home">
          <Button variant="contained" color="primary" onClick={toggleTheme}>Hello world</Button>
      </div>
    );
}
  
  