import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";
import "../styles/error404.sass";
import "../styles/index.sass";
import "../styles/fonts.sass";
import Meta from "../components/Meta";
import { DevSupport } from "@react-buddy/ide-toolbox-next";
import { ComponentPreviews, useInitial } from "../components/dev";

// const bangle = localFont({ src: "../assets/fonts/SolaimanLipi.ttf" });
// const bangla = Roboto({
//   weight: ["400", "500", "700"],
//   subsets: ["latin"],
// });

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
    fontFamily: `"HNT","Inter","Roboto","Arial",sans-serif`,
    fontSize: 13,
    fontWeightLight: 400,
  },
});

function App({ Component, pageProps }) {
  return (
    <>
      <Meta />

      <ThemeProvider theme={theme}>
        <NextNProgress />
        <DevSupport
          ComponentPreviews={ComponentPreviews}
          useInitialHook={useInitial}
        >
          <Component {...pageProps} />
        </DevSupport>
      </ThemeProvider>
    </>
  );
}

export default App;
