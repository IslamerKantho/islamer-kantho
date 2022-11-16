import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="bn">
        <Head>
          <meta name="theme-color" content="#055547" />
          <meta name="manifest" content="/manifest.json" />
          {/* {this.props.emotionStyleTags} */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
