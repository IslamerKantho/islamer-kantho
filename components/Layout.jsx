import BlockFooter from "./Block/BlockFooter";
import Header from "./Header";
import Meta from "./meta";

const Layout = ({ preview, children }) => {
	return (
		<>
			<Meta />

			<Header />
			{/* <NavigationHeader /> */}
			<main>{children}</main>
			<BlockFooter />
		</>
	);
};

export default Layout;
