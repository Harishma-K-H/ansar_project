import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#877bdc", 
    },
    secondary: {
      main: "#2575FC",  
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif', 
    body1: {
      color: "#555",  //color for body text
    },
  },
  shape: {
    borderRadius: 4,  // Custom border radius for components
  },
});

export default theme;
