import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="bn">
        <Head>
          <meta name="theme-color" content="#044f4f" />
          <meta name="manifest" content="/manifest.json" />
          <link rel="dns-prefetch" href="https://cdn.sanity.io" />
          <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
