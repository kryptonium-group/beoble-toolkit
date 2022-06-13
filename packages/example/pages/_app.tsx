import { AppProps } from 'next/app';
import Head from 'next/head';
import { Web3ContextProvider } from '../components/Web3Button/web3Context';
import { BeobleProvider, Chat } from '@beoble/react';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to example!</title>
      </Head>
      <Web3ContextProvider>
        <BeobleProvider>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </BeobleProvider>
      </Web3ContextProvider>
    </>
  );
}

export default CustomApp;
