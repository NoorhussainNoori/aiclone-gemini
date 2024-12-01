import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define the cyberpunk-style theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0f0f0f", // Dark cyberpunk background
      },
      secondary: {
        main: "#ff00ff", // Neon purple for the buttons
      },
      background: {
        default: "#0a0a0a", // Dark page background
      },
      text: {
        primary: "#0ff", // Neon cyan text color
      },
    },
    typography: {
      fontFamily: "Orbitron, sans-serif", // Futuristic font style
      h6: {
        fontSize: "2rem", // Make title larger and bolder
        fontWeight: "700",
        color: "#0ff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0a0a0a",
          borderBottom: "1px solid #ff00ff", // Neon purple border for a cool effect
          boxShadow: "0px 0px 15px 2px rgba(255, 0, 255, 0.7)", // Neon glow for the navbar
        }}
      >
        <Container>
          <Toolbar disableGutters>
            {/* Brand / Logo */}
            <Typography
              variant="h6"
              component="a"
              href="#"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "#0ff", // Neon cyan
                fontWeight: "bold",
                fontSize: "2rem",
                textShadow: "0 0 8px #0ff", // Neon glow for text
              }}
            >
              Noor Bot
            </Typography>

            {/* Mobile menu button */}
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              sx={{
                display: { lg: "none", xs: "block" },
                color: "#ff00ff", // Neon purple
              }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* Auth buttons (visible on larger screens) */}
            {/* <Box sx={{ display: { xs: "none", lg: "flex" } }}>
              <Button
                variant="outlined"
                sx={{
                  color: "#0ff", // Neon cyan text
                  borderColor: "#0ff", // Neon cyan border
                  mx: 1,
                  "&:hover": {
                    borderColor: "#ff00ff",
                    color: "#ff00ff", // Neon purple hover effect
                  },
                  textShadow: "0 0 6px #0ff",
                }}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  mx: 1,
                  boxShadow: "0 0 10px #ff00ff", // Glowing effect for the button
                }}
              >
                Sign up
              </Button>
            </Box> */}
          </Toolbar>
        </Container>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Box
            sx={{
              display: { xs: "block", lg: "none" },
              backgroundColor: "#0f0f0f",
              color: "white",
              py: 2,
              borderTop: "1px solid #ff00ff", // Border between app bar and mobile menu
              boxShadow: "0px 0px 15px 2px rgba(255, 0, 255, 0.7)",
            }}
          >
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "#0ff",
                  borderColor: "#0ff",
                  mb: 1,
                  "&:hover": {
                    borderColor: "#ff00ff",
                    color: "#ff00ff",
                  },
                  textShadow: "0 0 6px #0ff",
                }}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ boxShadow: "0 0 10px #ff00ff" }}
              >
                Sign up
              </Button>
            </Box> */}
          </Box>
        )}
      </AppBar>
    </ThemeProvider>
  );
}
