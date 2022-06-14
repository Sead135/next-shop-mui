import React from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import "./../styles/globals.css";
import { StoreProvider } from "../utils/store";

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </CacheProvider>
  );
};

export default MyApp;
