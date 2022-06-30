import "antd/dist/antd.css";
import "../styles/error404.sass";
import "../styles/index.sass";
// import 'tailwindcss/tailwind.css'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextNProgress />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
