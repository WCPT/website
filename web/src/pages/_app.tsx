import '../styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * https://nextjs.org/docs/advanced-features/custom-app
 *
 * When a page is requested, Next.js uses _app to initialize the page.
 *
 * Important: Only the first request of a Next.js page is executed on
 * the server side and then executed on the client side after hydration,
 * and the subsequent pages are only executed on the client side.
 */
function _App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default _App;
