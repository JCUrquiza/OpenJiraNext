import { NextPage } from "next";
import { Typography } from "@mui/material";
import { Layout } from "../components/layouts";

const HomePage: NextPage = () => {
  return (
    <Layout title="Hola">
      <Typography variant="h1" color='primary' >Hola por fin..!!</Typography>
    </Layout>
  )
}

export default HomePage;
