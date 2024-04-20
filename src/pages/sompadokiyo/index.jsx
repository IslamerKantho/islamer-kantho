import { Container } from "@mui/material";
import Layout from "../../components/Layout";
import BlockPageHeader from "../../components/Block/BlockPageHeader";

const PageContact = () => {
  return (
    <>
      <Layout>
        <BlockPageHeader title="সম্পাদকীয়" />

        <section className="">
          <Container className="max-w-[1280px]"
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
            <h6>লেখা পাঠানোর নিয়মাবলী</h6>
            <p>
              “ইসলামের কন্ঠ” (islamerkantho.com) অনলাইনে ‘আহলে সুন্নাত ওয়াল
              জামাআত’ এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপনের একটি
              বিশ্বস্থ ক্ষেত্র। ইসলামের কন্ঠে প্রকাশের জন্য পাঠাতে পারেন আপনার
              লেখা যেকোনো ইসলামিক প্রবন্ধ। সম্ভব হলে সংশ্লিষ্ট ছবি পাঠাতে পারেন।
              তাছাড়া পাঠাতে পারেন বিভিন্ন অনুবাদ লেখাও।
            </p>
            <h6>নিয়মাবলী:</h6>
            <ul>
              <li>যেকোনো ইসলামিক লেখা পাঠাতে পারেন ।</li>
              <li>লেখা ইউনিকোড বা অভ্র বাংলা কিবোর্ড এর মাধ্যমে লিখতে হবে।</li>
              <li>
                ইন্টারনেটের অন্য কোন সাইটে প্রকাশিত লেখা পাঠাবেন না, তবে ইসলামের
                কন্ঠে প্রকাশের পর যে কোন সাইটে শেয়ার করতে পারবেন।
              </li>
              <li>
                বহুল প্রচারিত নয় এমন ম্যাগাজিন বা পত্রিকায় প্রকাশিত লেখা পাঠানো
                যাবে, যাদের অনলাইন সংস্করন নাই। তবে নতুন লেখাই কাম্য ।
              </li>
              <li>
                লেখার শিরোনাম যথা সম্ভব ছোট হওয়া চাই। কমপক্ষে ১৫০ শব্দের মধ্যে
                একটি ভূমিকা লিখতে হবে।
              </li>
              <li>
                লেখা WORD ফাইলে বা ইমেইলে লিখেও পাঠাতে পারেন, PDF বা অন্য ফাইলে
                পাঠাবেন না।
              </li>
              <li>
                লেখা সরাসরি ওয়েবসাইটে পোষ্ট করার জন্য আপনাকে প্রথমে সাইন আপ করে
                নিতে হবে।
              </li>
              <li>
                লেখা নির্বাচনের ব্যাপারে এডমিন প্যানেলের সিদ্ধান্তই চুড়ান্ত ।
              </li>
              <li>
                “ইসলামের কন্ঠ” কর্তৃপক্ষ আপনার পাঠানো লেখা পরিমার্জন করার ক্ষমতা
                রাখে।
              </li>
            </ul>
            <p>
              (লেখক-লেখিকাদের প্রতি একান্ত অনুরোধ লেখা পাঠিয়েই ইসলামের কন্ঠে
              প্রকাশের আগে দয়া করে সেই লেখাটি ইন্টারনেটের অন্য কোন সাইটে নিজে
              বা অন্যের মাধ্যমে প্রকাশ করবেন না)
            </p>

            <p>
              <strong>লেখা পাঠানোর ঠিকানাঃ</strong>
              <br />
              ফেসবুক:{" "}
              <a
                href="https://www.facebook.com/islamerkantho"
                title="Facebook | ইসলামের কন্ঠ"
              >
                https://www.facebook.com/islamerkantho
              </a>
              <br />
              ওয়েবসাইটঃ{" "}
              <a href="https://islamerkantho.com/" title="ইসলামের কন্ঠ">
                https://islamerkantho.com/
              </a>
              <br />
              ই-মেইলঃ{" "}
              <a href="mailto:info@islamerkantho.com" title="ইসলামের কন্ঠ">
                info@islamerkantho.com
              </a>
              <br />
              <a href="https://islamerkantho.com/editorial" title="সম্পাদকীয়">
                https://islamerkantho.com/editorial
              </a>
            </p>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default PageContact;
