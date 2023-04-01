import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Lato, Bitter } from "next/font/google";

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
  return (
    <>
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
