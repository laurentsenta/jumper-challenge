'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7b3fe4", // Vibrant violet
      light: "#9D4EDD",
      dark: "#6A0DAD",
    },
    background: {
      default: "#0A0A0F",
      paper: "rgba(255, 255, 255, 0.05)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(10, 10, 15, 1.0)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "0 0 20px rgba(138, 43, 226, 0.3)",
          borderRadius: 12,
          "&:hover": {
            boxShadow: "0 0 25px rgba(138, 43, 226, 0.5)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#FFFFFF",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          '& .MuiInputBase-input': {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "SFRounded",
      "ui-rounded",
      "SF Pro Rounded",
      "-apple-system",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#FFFFFF",
    },
    h2: {
      fontWeight: 700,
      color: "#FFFFFF",
    },
    h3: {
      fontWeight: 700,
      color: "#FFFFFF",
    },
    h4: {
      fontWeight: 700,
      color: "#FFFFFF",
    },
    h5: {
      fontWeight: 700,
      color: "#FFFFFF",
    },
    h6: {
      fontWeight: 700,
      color: "#FFFFFF",
    },
    button: {
      fontWeight: 700,
      color: "#FFFFFF",
    },
    body1: {
      color: "#FFFFFF",
    },
    body2: {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
});

export default theme;
