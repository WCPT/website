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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default _Document;
