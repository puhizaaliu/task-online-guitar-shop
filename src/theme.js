import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#ff6a00" }, 
    text: { primary: "#111", secondary: "#6b7280" } 
  },
  typography: {
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    h2: { fontWeight: 800, letterSpacing: "-0.5px" },
    h5: { fontWeight: 700 }
  },
  shape: { borderRadius: 12 }
});

export default theme;
