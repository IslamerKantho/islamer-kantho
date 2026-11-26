import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="bn">
        <Head>
          {/* Google tag (GTM-TP7L22JN) */}
          <script
            async
            src="https://www.googletagmanager.com/gtm.js?id=GTM-TP7L22JN"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`,
            }}
          />
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
