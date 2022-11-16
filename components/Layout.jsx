import BlockFooter from "./Block/BlockFooter";
import Header from "./Header";
import Meta from "./Meta";

const Layout = ({ className, preview, children }) => {
  return (
    <>
      <Header />

      <main className={`${className}`}>{children}</main>

      <BlockFooter />
    </>
  );
};

export default Layout;
