import { RiMenuLine } from "react-icons/ri";
import NextLink from "next/link";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { memo } from "react";
import MenuDrawer from "../MenuDrawer";
import SecondaryNavbar from "./SecondaryNavbar";

const pages = [
  {
    title: "সম্পাদকীয়",
    url: "/sompadokiyo",
  },
  {
    title: "আর্কাইভ",
    url: "/archive",
  },
  { title: "আমাদের পরিচিতি", url: "amader-porichithi" },
  { title: "লেখা পাঠানোর নিয়মাবলী", url: "lekha-patanur-niyomaboli" },
  { title: "যোগাযোগের মাধ্যম", url: "jugajuger-maddyom" },
];

const Header = () => {
  const [isCatDrawerOpen, setIsCatDrawerOpen] = useState(false);
  const openHandler = () => setIsCatDrawerOpen(true);
  const closeHandler = () => setIsCatDrawerOpen(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full text-black bg-white"
      >
        {/* Primary Nav */}
        <nav className="relative h-14 w-full flex items-center">
          <div className="container-lg flex h-[48px] items-center justify-between w-full">

            <div className="flex items-center h-full">

              {/* Hamburger button */}
              <button
                className="mr-4 p-1 rounded-full transition-colors text-black"
                onClick={openHandler}
                aria-label="Open menu"
              >
                <RiMenuLine size={24} />
              </button>

              {/* Brand Name */}
              <NextLink
                href="/"
                className="mr-6 font-bold text-lg md:text-xl text-primary"
              >
                ইসলামের কন্ঠ
              </NextLink>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex flex-1 gap-5 items-center pl-6 pr-5 text-black">
              {pages.map((page, i) => (
                <NextLink
                  key={i}
                  href={page.url}
                  className="cursor-pointer text-[13px] leading-5 font-bold hover:text-primary"
                >
                  {page.title}
                </NextLink>
              ))}
            </nav>

            {/* Desktop Toolbar Profile Area */}
            <div className="flex items-center gap-5 pl-6 pr-0 sm:pr-2.5 ml-auto">
                {/* Search */}
                <NextLink
                  href="/search"
                  title="Search content"
                className="cursor-pointer hover:opacity-75 text-primary"
                >
                  <BiSearch size={16} />
                </NextLink>

                {/* Studio */}
                <a
                  href="https://ik.sanity.studio"
                  target="_blank"
                  rel="noreferrer"
                  title="Profile"
                className="cursor-pointer hover:opacity-75 text-primary"
                >
                  <FiUser size={16} />
                </a>
            </div>
          </div>
        </nav>

        {/* Secondary Nav for Prayer Times & Hijri Calendar */}
        <SecondaryNavbar />
      </header>

      <MenuDrawer
        isVisible={isCatDrawerOpen}
        openHandler={openHandler}
        closeHandler={closeHandler}
      />
    </>
  );
};

export default memo(Header);
