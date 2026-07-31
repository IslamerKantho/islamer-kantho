import clsx from "clsx";
import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ preview, settings, className, children }) => {
  return (
    <>
      {preview && <Alert />}
      <Header settings={settings} />

      <main
        className={clsx("max-w-full h-full min-h-(calc(100vh - 314.56px))", className)}
        sx={{
          background: "#edebeb",
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
