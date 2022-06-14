import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import data from "../utils/data";
import classes from "../utils/classes";
import NextLink from "next/link"
import axios from "axios";

const Home = ({products}) => {
  return (
    <Layout>
      <Typography variant="h2">Товары</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={3} key={product._id}>
            <Card>
              <NextLink href={`/product/${product._id}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.img}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography noWrap>
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions sx={classes.cardActions}>
                <Typography>{product.price} руб.</Typography>
                <Button variant="outlined">В корзину</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: res.data
    }
  }
}

export default Home;
