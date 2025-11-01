import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import { ErrorBoundary } from '../components/ErrorBoundary';

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <Head>
        <title>Axion: Your Autonomous Operations Platform</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2E3440" />
      </Head>

      <ErrorBoundary>
        <div
          className="text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-base"
          onClick={onClickAnywhere}
        >
          <main className="bg-light-background dark:bg-dark-background w-full h-full p-2">
            <Component {...pageProps} inputRef={inputRef} />
          </main>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default App;
