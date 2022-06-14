import Head from "next/head";
import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  Box,
  Button,
  Switch,
} from "@mui/material";
import NextLink from "next/link";
import classes from "../utils/classes";
import { Store } from "../utils/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, green, grey, red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Cookies from "js-cookie";

const Layout = ({ children, title, description }) => {
  const { state, dispatch } = useContext(Store);
  const { darkTheme } = state;

  useEffect(() => {
    dispatch({
      type: "LOAD_THEME",
      payload: Cookies.get("darkTheme") === "ON" ? true : false,
    });
  }, [dispatch]);

  const darkThemeChangeHandler = () => {
    dispatch({ type: darkTheme ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    Cookies.set("darkTheme", darkTheme ? "OFF" : "ON");
  };

  const theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
      primary: {
        light: blue[700],
        main: blue[700],
        dark: blue[500],
      },
      secondary: {
        light: green[700],
        main: green[700],
        dark: green[500],
      },
      text: {
        light: grey[900],
        main: grey[900],
        dark: grey[100],
      },
      button: {
        light: grey[100],
        main: grey[100],
        dark: grey[900],
      },
      stocks: {
        avaible: green[500],
        notavaible: grey[500],
      },
    },
  });

  return (
    <>
      <Head>
        <title>{title ? title : "Магазин"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link color="text.dark" variant="a" sx={classes.link}>
                <Typography variant="h6">Магазин</Typography>
              </Link>
            </NextLink>
            <Box flexGrow={1}></Box>
            <Box>
              <Switch checked={darkTheme} onChange={darkThemeChangeHandler} />
              <NextLink href="/cart" passHref>
                <Link sx={classes.link} variant="a">
                  <Button color="button" variant="outlined">
                    Корзина
                  </Button>
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link sx={classes.link} variant="a">
                  <Button color="button" variant="outlined">
                    Вход
                  </Button>
                </Link>
              </NextLink>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" component="main">
          {children}
        </Container>
        <Container maxWidth="lg" component="footer">
          <Typography variant="h6" color="primary" textAlign="center">
            Все права защищены | 2022
          </Typography>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
