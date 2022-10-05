import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";

import { AppContextProvider } from "../contexts";
import { SocialLinks } from "../common/types";

/**
 * https://nextjs.org/docs/advanced-features/custom-app
 *
 * When a page is requested, Next.js uses _app to initialize the page.
 *
 * Important: Only the first request of a Next.js page is executed on
 * the server side and then executed on the client side after hydration,
 * and the subsequent pages are only executed on the client side.
 */
function _App({
  Component,
  pageProps,
}: AppProps<{
  socialLinks: SocialLinks;
}>) {
  return (
    <AppContextProvider socialLinks={pageProps.socialLinks}>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

_App.getInitialProps = async (appContext: AppContext) => {
  const { pageProps, ...appProps } = await App.getInitialProps(appContext);
  return {
    ...appProps,
    pageProps: {
      ...pageProps,
      socialLinks: {
        facebook: "#",
        twitter: "#",
        youtube: "#",
        email: "#",
      },
    },
  };
};

export default _App;
