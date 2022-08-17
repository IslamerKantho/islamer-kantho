import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import NextNProgress from "nextjs-progressbar";
import "../styles/error404.sass";
import "../styles/index.sass";

const theme = createTheme({
	typography: {
		fontFamily: ["Inter", "sans-serif"].join(","),
		fontSize: "13px",
		lineHeight: "20px",
	},
	platte: {
		main: "#055547",
	},
});
function App({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider theme={theme}>
				<NextNProgress />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default App;
