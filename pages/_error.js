// import '../styles/error404.sass'
import Layout from "../components/layout";
import Head from "next/head";
import Link from "next/link";
import NavigationHeader from "../components/Navigation/NavigationHeader";

const Error = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>{statusCode} | ইসলামের কন্ঠ</title>0
      </Head>

      <Layout>
        <section id="notfound">
          <div className="notfound">
            <div>
              <div className="notfound-404">
                <h1>!</h1>
              </div>

              <h2>Error {statusCode}</h2>
              <p>
                The page you are looking for might have been removed had its
                name changed or is temporarily unavailable.
                <Link href={"/"}>Back to homepage</Link>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Error;
