import {
  Typography,
  Grid,
  CardMedia,
  Card,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import classes from "../../utils/classes";
import axios from "axios"

const ProductPage = ({product}) => {

  return (
    <Layout
      title={product ? product.name : "Товар не найден"}
      description={product ? product.description : "Товар не найден"}
    >
      {product ? (
        <>
          <Grid container spacing={4} sx={classes.productGrid}>
            <Grid item xs={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.img}
                  title={product.name}
                  sx={{ cursor: "pointer" }}
                />
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h2">{product.name}</Typography>
              <List>
                <ListItem>Производитель: {product.brand}</ListItem>
                <ListItem>Отзывы: {product.rating}</ListItem>
                <ListItem>Просмотров: {product.numReview}</ListItem>
              </List>
              <Typography variant="p">{product.description}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Цена</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{product.price} руб.</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Статус</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          color={
                            product.coutnInStocks > 0
                              ? "stocks.avaible"
                              : "stocks.notavaible"
                          }
                        >
                          {product.coutnInStocks > 0
                            ? "В наличии"
                            : product.coutnInStocks === 1
                            ? "Остался последний"
                            : "Закончился"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      type="button"
                      fullWidth
                      disabled={product.coutnInStocks > 0 ? false : true}
                      variant="outlined"
                    >
                      Добавить в корзину
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>Товар не найден</Typography>
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({params}) => {
  const res = await axios.get(req.headers.host + '/api/products/');

  const product = res.data.find(item => item._id === params.id)

  return {
    props: {
      product
    },
  };
};

export default ProductPage;
