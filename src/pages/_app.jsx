import dynamic from "next/dynamic";
import "./../styles/globals.css";
import "../styles/error404.css";
import "../styles/index.css";
import Meta from "../components/Meta";
import { fontVariables } from "../styles/fonts";

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  ssr: false,
});

function App({ Component, pageProps }) {
  return (
    <main className={fontVariables}>
      <Meta />
      <NextNProgress color="#D1BB9E" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </main>
  );
}

export default App;
