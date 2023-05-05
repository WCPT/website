import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Lato, Bitter } from "next/font/google";
import Script from "next/script";

const lato = Lato({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400", "900"],
});

const bitter = Bitter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700"],
});

function _App({ Component, pageProps }: AppProps) {
  const GA_TAG_ID = process.env.NEXT_PUBLIC_GA_TAG_ID;

  return (
    <>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TAG_ID}');
            gtag('config', '${GA_TAG_ID}', {
              page_path: window.location.pathname,
          });
          `,
        }}
      />

      <Component {...pageProps} />
      <style jsx global>{`
        :root {
          --font-sans: ${lato.style.fontFamily}, sans-serif;
          --font-serif: ${bitter.style.fontFamily}, serif;
        }
      `}</style>
    </>
  );
}

export default _App;
