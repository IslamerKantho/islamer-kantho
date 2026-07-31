import SEO from "../components/SEO";
import Link from "next/link";
import Layout from "../components/Layout";

const error404 = () => {
  return (
    <>
      <SEO title="পৃষ্ঠা পাওয়া যায়নি (404)" noindex={true} />

      <Layout>
        <section id="notfound">
          <div className="notfound">
            <div>
              <div className="notfound-404">
                <h1>!</h1>
              </div>
              <h2>দুঃখিত! 404</h2>
              <p>
                আপনি যে পৃষ্টার অনুসন্ধান করতেছেন তা খোজে পাওয়া যায়নি। অনুগ্রহ
                করে লিংক সঠিক কি/না তা যাচাই করুন। অথবা
                <Link href={"/"}>মূল পাতায় ফিরে যান</Link>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default error404;
