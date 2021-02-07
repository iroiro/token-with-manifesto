import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#EAB222",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "museo-sans-rounded, sans-serif",
    h4: {
      fontSize: "2rem",
      fontWeight: 300,
    },
    h5: {
      fontSize: "1.375rem",
    },
    body1: {
      fontWeight: 300,
    },
  },
  overrides: {
    MuiChip: {
      root: {
        fontFamily: "inherit",
        fontWeight: 700,
      },
      label: {
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
    MuiButton: {
      root: {
        padding: "12px 30px",
        textTransform: "inherit",
      },
      outlined: {
        padding: "12px 30px",
        textTransform: "inherit",
        fontWeight: 700,
      },
      outlinedPrimary: {
        border: `2px solid rgba(234, 178, 34, 0.5)`,
        "&:hover": {
          border: `2px solid rgba(234, 178, 34, 1)`,
        },
      },
    },
  },
});
