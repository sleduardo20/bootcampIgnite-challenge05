import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyles } from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>spacetravaling - Blog</title>
      </Head>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
