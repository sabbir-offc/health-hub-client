import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565C0",
      contrastText: "white",
    },
    secondary: {
      main: "#4CAF50",
    },
    warning: {
      main: "#FF9800",
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
});

const SiteTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

SiteTheme.propTypes = {
  children: PropTypes.node,
};
export default SiteTheme;
