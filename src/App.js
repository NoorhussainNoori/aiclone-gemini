import { Button, Container, Grid } from "@mui/material";
import "@fontsource/poppins";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "./Components/Layout/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Container>
      <Grid container rowSpacing={2}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Navbar />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
