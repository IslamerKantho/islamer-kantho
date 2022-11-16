import BlockFooter from "./Block/BlockFooter";
import Header from "./Header";
import Meta from "./meta";

const Layout = ({ className, preview, children }) => {
  return (
    <>
      <Meta />
      <Header />

      <main className={`${className}`}>{children}</main>

      <BlockFooter />
    </>
  );
};

export default Layout;
