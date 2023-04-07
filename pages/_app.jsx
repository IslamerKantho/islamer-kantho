import {
    createTheme,
    ServerStyleSheets,
    ThemeProvider,
} from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";
import "../styles/error404.sass";
import "../styles/index.sass";
import Meta from "../components/Meta";
import {Roboto} from "@next/font/google";
import daynamic from "next/dynamic";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../components/dev";

// const bangla = localFont({ src: "../assets/fonts/SolaimanLipi.ttf" });
const bangla = Roboto({
    weight: ["400", "500", "700"],
});

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
        // fontFamily: [inter.style.fontFamily, "sans-serif"].join(","),
        fontFamily: `"Helvetica","Roboto","Arial",sans-serif`,
        fontSize: 13,
        lineHeight: 20,
    },
});

function App({Component, pageProps}) {
    return (
        <>
            <Meta/>

            <ThemeProvider theme={theme}>
                <NextNProgress/>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <Component {...pageProps} />
                </DevSupport>
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
           {
            /* font-family: ${bangla.style.fontFamily}; */
          }
          font-family: "Helvetica", ${bangla.style.fontFamily}, "Arial",
            sans-serif;
        }
      `}</style>
        </>
    );
}

export default App;
