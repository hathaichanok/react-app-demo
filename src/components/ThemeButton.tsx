import { Button, styled } from "@mui/material";

export const ThemeButtonPrimary = styled(Button)(() => ({
    backgroundColor: "#0064ff",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#0053cc",
    },
    "&:disabled": {
      backgroundColor: "#cccccc",
      color: "#666666",
    },
}));

export const ThemeButtonDanger = styled(Button)(() => ({
    backgroundColor: "#e63946",
    color: "#ffffff",
    "&:hover": {
        backgroundColor: "#d62839",
    },
    "&:disabled": {
        backgroundColor: "#f5c6cb",
        color: "#ffffff",
    },
}));