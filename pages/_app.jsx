import "antd/dist/antd.css";
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
				<NextNProgress />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
