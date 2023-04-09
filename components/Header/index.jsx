import { RiMenuLine } from "react-icons/ri";
import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import { SiPhpmyadmin } from "react-icons/si";
import dynamic from "next/dynamic";
import { memo } from "react";
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
  { title: "আমাদের পরিচিতি", url: "amader-bisoye" },
  { title: "যোগাযোগের মাধ্যম", url: "jugajuger-maddyom" },
];

const Header = () => {
  const [background] = useState("#055547");
  const [isCatDrawerOpen, setIsCatDrawerOpen] = useState(false);
  const openHandler = () => setIsCatDrawerOpen(true);
  const closeHandler = () => setIsCatDrawerOpen(false);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          padding: 0,
          background: background,
          borderBottom: "1px solid #000",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            {/*************************************
             * Desktop Area Started
             ************************************/}
            <IconButton
              onClick={openHandler}
              sx={{
                mr: 2,
                color: "#FFF",
              }}
            >
                <RiMenuLine />
            </IconButton>

            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              href={"/"}
              component={NextLink}
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              ইসলামের কন্ঠ
            </Typography>
            {/*************************************/}

            {/*************************************
             * Phone Area Started
             ************************************/}
            <Box className="" sx={{ display: { xs: "flex", md: "none" } }}>
              {/* Phone: Menu Toggle Button */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleOpenNavMenu}
                onClick={openHandler}
                color="inherit"
              >
                <RiMenuLine />
              </IconButton>
            </Box>

            {/* Brand logo for phone */}
            <Typography
              variant="h5"
              noWrap
              component={NextLink}
              href="/"
              sx={{
                ml: 0,
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontSize: 18,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ইসলামের কন্ঠ
            </Typography>
            {/*************************************/}

            {/* Desktop menu */}
            <Box
              className="ik__desktop__nav__menu"
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                gap: "20px",
                alignItems: "center",
                paddingLeft: "25px",
                paddingRight: 20,
                // justifyContent: "space-between",
              }}
            >
              {pages.map((page, i) => (
                <Link
                  href={pages.url}
                  underline="none"
                  key={i}
                  sx={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: "13px",
                    lineHeight: "21px",
                    display: "block",
                    fontWeight: 700,
                    "&:last-of-type": {
                      marginRight: "auto",
                    },
                    ":hover": {
                      color: "#FFF",
                      opacity: 0.8,
                    },
                  }}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
            {/* ----/---- */}

            {/* Desktop Toolbar Profile Area */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                gap: "20px",
                alignItems: "center",
                paddingLeft: "25px",
                paddingRight: { xs: 0, md: 10 },
                // justifyContent: "space-between",
              }}
            >
              <IconContext.Provider value={{ size: 20 }}>
                <Link
                  href="/search"
                  underline="none"
                  sx={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: "13px",
                    lineHeight: "21px",
                    display: "block",
                    fontWeight: 700,
                    "&:last-of-type": {
                      marginRight: "auto",
                    },
                    ":hover": {
                      color: "#FFF",
                      opacity: 0.8,
                    },
                  }}
                >
                  <Box>
                    <BiSearch title="Search page" />
                  </Box>
                </Link>

                <Link
                  href="/studio"
                  underline="none"
                  sx={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: "13px",
                    lineHeight: "21px",
                    display: "block",
                    fontWeight: 700,
                    "&:last-of-type": {
                      marginRight: "auto",
                    },
                    ":hover": {
                      color: "#FFF",
                      opacity: 0.8,
                    },
                  }}
                >
                  <SiPhpmyadmin title="Studio" />
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
