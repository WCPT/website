import { Html, Head, Main, NextScript } from "next/document";

/**
 * https://nextjs.org/docs/advanced-features/custom-document
 *
 * Initialised only once for the app, always rendered the server side.
 */
function _Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <meta
          name="description"
          content="Community for the teachers in the wider Pacific region"
        />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lato:wght@300;400;900&family=Cousine:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default _Document;
