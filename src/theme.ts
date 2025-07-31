import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 900px)": {
            marginLeft: "0 !important",
            width: "100% !important",
          },
        },
      },
    },
  },
});

export default theme;
