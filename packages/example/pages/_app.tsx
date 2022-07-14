import { AppProps } from 'next/app';
import Head from 'next/head';
import { Web3ContextProvider } from '../components/Web3Button/web3Context';
import { BeobleProvider, Chat } from '@beoble/react';
import { Core } from '@beoble/js-sdk';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const demoAppId = 'ddcd9c84-45c7-4d05-8008-18582d7f91be';
  const core = new Core({
    appId: demoAppId,
  });

  return (
    <>
      <Head>
        <title>Welcome to example!</title>
      </Head>
      <Web3ContextProvider>
        <BeobleProvider Beoble={core}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </BeobleProvider>
      </Web3ContextProvider>
    </>
  );
}

export default CustomApp;
