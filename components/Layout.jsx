import BlockFooter from "./Block/BlockFooter";
import Header from "./Header";

const Layout = ({ className,  children }) => {
  return (
    <>
      <Header />

      <main className={`${className}`}>{children}</main>

      <BlockFooter />

        <style jsx>{`
            main {
                max-width: 100%;
              height: 100%;
              min-height: calc(100vh - 314.56px);
            }
        `}</style>
    </>
  );
};

export default Layout;
