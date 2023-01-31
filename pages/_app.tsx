import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import ReactGA from 'react-ga4';

import "../styles/globals.css";

ReactGA.initialize('G-D2TLX39XJS');
ReactGA.send('pageview');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
