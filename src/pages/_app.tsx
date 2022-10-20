import type { AppProps } from 'next/app';
import '../assets/styles/app.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
