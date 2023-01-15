import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import Auth from 'components/common/Auth';
import Header from 'components/common/Header';
import 'styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>채팅</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Auth />
        <Header />
        <Component {...pageProps} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
