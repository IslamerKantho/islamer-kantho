import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";
import "../styles/error404.sass";
import "../styles/index.sass";
import { Inter } from "@next/font/google";

const inter = Inter();

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
      {/* <div className={inter.className}> */}
      <ThemeProvider theme={theme}>
        <NextNProgress />
        <Component {...pageProps} />
      </ThemeProvider>
      {/* </div> */}

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
