import "./../styles/globals.css";
import "./../styles/tailwind.css";
import { ThemeProvider } from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";
import "../styles/error404.sass";
import "../styles/index.sass";
import "../styles/fonts.sass";
import Meta from "../components/Meta";
import theme from "../styles/theme";
import {GoogleTagManager} from '@next/third-parties/google'

// const bangle = localFont({ src: "../assets/fonts/SolaimanLipi.ttf" });
// const bangla = Roboto({
//   weight: ["400", "500", "700"],
//   subsets: ["latin"],
// });



function App({ Component, pageProps }) {
  return (
    <>
      <Meta />

      <ThemeProvider theme={theme}>
        <NextNProgress color="#D1BB9E"  />
          <Component {...pageProps} />
          <GoogleTagManager gtmId="G-8BVMCD0568" />
      </ThemeProvider>
    </>
  );
}

export default App;
