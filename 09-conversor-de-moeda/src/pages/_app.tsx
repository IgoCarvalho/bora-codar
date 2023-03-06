import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Conversor de Moedas</title>
        <meta name="description" content="Aplicação para conversão de moedas e seu histórico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <style>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
