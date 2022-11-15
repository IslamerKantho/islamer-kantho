import {
  createTheme,
  ServerStyleSheets,
  ThemeProvider,
} from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";
import "../styles/error404.sass";
import "../styles/index.sass";
import { Inter } from "@next/font/google";
import Head from "next/head";

const inter = Inter();
const sheets = new ServerStyleSheets();
const css = sheets.toString();

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#055547",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    // fontFamily: ["Inter", "sans-serif"].join(","),
    fontFamily: [inter.style.fontFamily, "sans-serif"].join(","),
    fontSize: 13,
    lineHeight: 20,
  },
});

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style id="jsx-server-side">{css}</style>
      </Head>

      <ThemeProvider theme={theme}>
        <NextNProgress />
        <Component {...pageProps} />
      </ThemeProvider>

      <style jsx global>{`
        html,
        body,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        span,
        a {
          font-family: ${inter.style.fontFamily} !important;
        }
      `}</style>
    </>
  );
}

export default App;
