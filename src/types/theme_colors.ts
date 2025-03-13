import { createTheme } from "@mui/material";

const theme_colors = {
  PRIMARY: "#DF3226",
  PRIMARY_LIGHT: "#fff",
  PRIMARY_DARK: "#888",
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme_colors.PRIMARY,
    },
  },
});

export default theme_colors;
