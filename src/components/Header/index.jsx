import { RiMenuLine } from "react-icons/ri";
import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FiUser } from "react-icons/fi";
import dynamic from "next/dynamic";
import { memo } from "react";
import clsx from "clsx";
const MenuDrawer = dynamic(() => import("../MenuDrawer"));


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
  const [background] = useState("#055547");
  const [isCatDrawerOpen, setIsCatDrawerOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(true);
  const openHandler = () => setIsCatDrawerOpen(true);
  const closeHandler = () => setIsCatDrawerOpen(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setIsTouched(false);
    } else {
      setIsTouched(true);
    }
  });
  }, []);


  return (
    <>
      <AppBar
        className={clsx("p-0 border-b-[4px] border-b-primary will-change-transform transition-[background] duration-300", isTouched ? "bg-primary": "bg-white")}
        elevation={0}
        position="sticky"
      >
        <Container className="max-w-[1280px]" maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            {/*************************************
             * Desktop Area Started
             ************************************/}
            <IconButton
              className={clsx("me-4", isTouched ? "text-white" : "text-primary")}
              onClick={openHandler}
            >
              <RiMenuLine />
            </IconButton>

            <Typography
              className={clsx("max-md:hidden md:flex me-6 font-bold no-underline", isTouched ? "text-white" : "text-primary")}
              variant="h6"
              noWrap
              href={"/"}
              component={NextLink}
            >
              ইসলামের কন্ঠ
            </Typography>
            {/*************************************/}

            {/*************************************
             * Phone Area Started
             ************************************/}

            {/* Brand logo for phone */}
            <Typography
              className={clsx("ms-0 me-4 max-md:flex md:hidden flex-grow text-lg font-bold no-underline", isTouched ? "text-white" : "text-primary")}
              variant="h5"
              noWrap
              component={NextLink}
              href="/"
            >
              ইসলামের কন্ঠ
            </Typography>
            {/*************************************/}

            {/* Desktop menu */}
            <Box
              className={clsx("ik__desktop__nav__menu", "flex-grow max-md:hidden md:flex gap-5 items-center ps-6 pe-5", isTouched ? "text-white" : "text-primary")}
            >
              {pages.map((page, i) => (
                <Link
                key={i}
                  className={clsx("cursor-pointer text-[13px] leading-5 font-bold [&:last-of-type]:me-auto [&:hover]:opacity-75", isTouched ? "text-white" : "text-primary")}
                  href={page.url}
                  underline="none"
                  component={NextLink}
                  passHref
                >
                  {page.title}
                </Link>
              ))}
            </Box>
            {/* ----/---- */}

            {/* Desktop Toolbar Profile Area */}
            <Box
              className={clsx("ik__desktop__profile__area", "flex items-center gap-5 ps-6 max-md:pe-0 md:pe-2.5")}
            >
              <IconContext.Provider value={{ size: 14 }}>
                {/* Search */}
                <Link
                  className={clsx("cursor-pointer text-[13px] leading-5 font-bold [&:last-of-type]:me-auto [&:hover]:opacity-75", isTouched ? "text-white" : "text-primary")}
                  href="/search"
                  title="Search content"
                  underline="none"
                >
                    <BiSearch />
                </Link>

                {/* Studio */}
                <Link
                  className={clsx("cursor-pointer text-[13px] leading-5 font-bold [&:last-of-type]:me-auto [&:hover]:opacity-75", isTouched ? "text-white" : "text-primary")}
                  href="https://ik.sanity.studio"
                  target={"_blank"}
                  underline="none"
                  title="Profile"
                >
                  <FiUser />
                </Link>
              </IconContext.Provider>
            </Box>
            {/* --/-- */}
          </Toolbar>
        </Container>
      </AppBar>

      <MenuDrawer
        isVisible={isCatDrawerOpen}
        openHandler={openHandler}
        closeHandler={closeHandler}
      />
    </>
  );
};


export default memo(Header);
