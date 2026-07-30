import NextNProgress from "nextjs-progressbar";
import "./../styles/globals.css";
import "../styles/error404.css";
import "../styles/index.css";
import Meta from "../components/Meta";
import { GoogleTagManager } from "@next/third-parties/google";
import { hnt } from "../styles/fonts";

function App({ Component, pageProps }) {
  return (
    <main className={hnt.variable}>
      <Meta />
      <NextNProgress color="#D1BB9E" />
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-MWLK3D76" />
    </main>
  );
}

export default App;
