import { AppProps } from 'next/app';
import Head from 'next/head';
import { Web3ContextProvider } from '../components/Web3Button/web3Context';
import { BeobleProvider, Chat } from '@beoble/react';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const demoAppId = '2eef3eb4-db9a-46d2-b919-0a684cb87a50';

  return (
    <>
      <Head>
        <title>Welcome to example!</title>
      </Head>
      <Web3ContextProvider>
        <BeobleProvider appId={demoAppId}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </BeobleProvider>
      </Web3ContextProvider>
    </>
  );
}

export default CustomApp;
