import "antd/dist/antd.css";
import Head from "next/head";
import "../styles/error404.sass";
import "../styles/index.sass";
// import 'tailwindcss/tailwind.css'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";

const theme = createMuiTheme({
	typography: {
		fontFamily: ["Inter", "sans-serif"].join(","),
		fontSize: "14px",
		lineHeight: "21px",
	},
	platte: {
		main: "#055547",
	},
});
function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<NextNProgress />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
