import { AppProps } from 'next/app';
import Head from 'next/head';
import { Web3ContextProvider } from '../components/Web3Button/web3Context';
import { BeobleProvider, Chat } from '@beoble/react';
import { Core } from '@beoble/js-sdk';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const demoAppId = '2eef3eb4-db9a-46d2-b919-0a684cb87a50';
  const core = new Core();

  return (
    <>
      <Head>
        <title>Welcome to example!</title>
      </Head>
      <Web3ContextProvider>
        <BeobleProvider appId={demoAppId} Beoble={core}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </BeobleProvider>
      </Web3ContextProvider>
    </>
  );
}

export default CustomApp;
