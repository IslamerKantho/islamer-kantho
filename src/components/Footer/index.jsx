import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const LINKS = [
  {
    title: "Team",
    url: "/team",
  },
  {
    title: "Contribute",
    url: "/contribute",
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    title: "Terms",
    url: "/terms",
  },
];

const Footer = () => {
  return (
    <footer className="w-full px-0 pt-16 pb-20 bg-[#31313B] text-[#8E8E93]">
      <div>
        <div className="container">
          <div className="max-md:w-[278px] md:w-[270px]">
            <Image
              className="w-full"
              src="/img/branding/logo.png"
              alt="Islamer Kantho"
              height={34.8}
              width={184}
            />
          </div>
        </div>

        <div className="container mt-5">
          <p className="max-w-[610px] text-xs leading-5">
            “ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মূখে ‘আহলে সুন্নাত ওয়াল জামাআত’ এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে অপব্যাখ্যা ও ভ্রান্ত ধারনা নিরসনের লক্ষ্যে কাজ করা আমাদের একমাত্র উদ্দেশ্য। ‘ইসলামের কন্ঠ, বাংলা ভাষায় বিশুদ্ধ ইসলামী জ্ঞানের ক্ষেত্র হিসেবে বিবেচিত হবে, ইনশা আল্লাহ। আল্লাহুম্মা আমীন।
          </p>

          <div className="mt-5 flex flex-wrap gap-4">
            {LINKS.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-xs leading-5 font-bold text-[#8E8E93] hover:text-secondary no-underline hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <p className="text-xs leading-5 font-bold mt-3">
            © 2020–2024. All rights reserved.
          </p>
          <p className="text-xs leading-5">
            Technical Support{" "}
            <a
              className="text-secondary font-bold"
              href="https://dot9.dev/"
              target="_blank"
              rel="noreferrer"
            >
              Dot9.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
