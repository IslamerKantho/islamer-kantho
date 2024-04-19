import { Container } from "@mui/material";
import Layout from "../../components/Layout";
import BlockPageHeader from "../../components/Block/BlockPageHeader";

const PageEditorial = () => {
  return (
    <>
      <Layout>
        <BlockPageHeader title="যোগাযোগ" />

        <section className="">
          <Container
            className=""
            maxWidth="md"
            sx={{
              paddingTop: "2.8rem",
              paddingBottom: "2.8rem",
              "& p": {
                marginBottom: "1rem",
                textAlign: "justify",
              },

              "@media (max-width: 600px)": {
                paddingTop: "1rem",
                paddingBottom: "1rem",
              },
            }}
          >
            <h6>পরিচিতি</h6>
            <p>
              আমরা “ইসলামের কন্ঠ” এর মাধ্যমে আপনাদের সম্মূখে ‘আহলে সুন্নাত ওয়াল
              জামাআত’ এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন করার জন্য
              সর্বদা সচেষ্ট আছি। তদুপরি, ইনসানিয়াতের কারণে লেখায়, গবেষনায়,
              উপস্থাপনায় আমাদের ভূল থাকাটা স্বাভাবিক। রাসূল (সাঃ) বলেছেন- “এক
              মুমিন অপর মুমিনের জন্য আয়না স্বরূপ।” এজন্য আয়নার মত কাজ করা আপনার
              দায়িত্ব। তাই যদি কোন ধরণের ভূল আপনার কাছে পরিলক্ষিত হয়, তাহলে
              নির্দ্বিধায় ভূল শুদ্ধ করে দেয়ার লক্ষ্যে সত্তর যোগাযোগ করার জন্য
              অনুরোধ করছি। তাছাড়া যদি কোন মতামত, অভিযোগ, পরামর্শ, প্রতিক্রিয়া,
              সহায়তা বা মন্তব্য থেকে থাকে কিংবা ইসলামেরকন্ঠ.কম এর কোন পেইজে
              প্রবেশ করতে সমস্যার সম্মুখীন হন, তবে নিচের ই-মেইলের মাধ্যমে
              যোগাযোগ করতে পারেন।
            </p>

            <p>
              বিঃদ্রঃ আপনার যে কোন ইসলামিক প্রশ্ন বা জিজ্ঞাসা থেকে থাকে, তবে
              আমাদের কাছে ই-মেইল বা আমাদের ফোরাম এ পোষ্ট করতে পারেন। বিজ্ঞ
              ইসলামী স্কলারদের মাধ্যমে আপনার প্রশ্ন বা জিজ্ঞাসার জবাব দেয়ার
              চেষ্টা করব, ইনশা আল্লাহ।{" "}
            </p>

            <p>
              <strong>যোগাযোগর মাধ্যম: </strong>
              <br />
              ফোরাম-{" "}
              <a href="http://www.forum.islamerkantho.com">
                http://www.forum.islamerkantho.com
              </a>
              <br />
              ই-মেইল-{" "}
              <a href="info@islamerkantho.com">info@islamerkantho.com</a>
            </p>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default PageEditorial;
