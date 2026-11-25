import dynamic from "next/dynamic";
import Script from "next/script";
import "./../styles/globals.css";
import "../styles/error404.css";
import "../styles/index.css";
import Meta from "../components/Meta";
import { fontVariables } from "../styles/fonts";

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  ssr: false,
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MWLK3D76";

function App({ Component, pageProps }) {
  return (
    <main className={fontVariables}>
      <Meta />
      <NextNProgress color="#D1BB9E" options={{ showSpinner: false }} />
      <Component {...pageProps} />
      {GTM_ID && (
        <Script
          id="gtm-lazy-script"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
      )}
    </main>
  );
}

export default App;
