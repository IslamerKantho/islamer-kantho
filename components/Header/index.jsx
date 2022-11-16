import { RiMenuLine } from "react-icons/ri";
import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useState } from "react";
import MenuDrawer from "../MenuDrawer";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import S from "./Header.module.sass";
import { SiPhpmyadmin } from "react-icons/si";

const pages = [
  {
    title: "Editorial",
    url: "/",
  },
  { title: "About", url: "/" },
  { title: "Contact", url: "" },
  { title: "Donate", url: "" },
];

const Header = () => {
  const [background, setBackground] = useState("#055547");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isCatDrawerOpen, setIsCatDrawerOpen] = useState(false);

  const openHandler = () => setIsCatDrawerOpen(true);
  const closeHandler = () => setIsCatDrawerOpen(false);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
        <Container className={S.__container} maxWidth="xl">
          <Toolbar className={S.__toolbar} disableGutters variant="dense">
            {/*************************************
             * Desktop Area Started
             ************************************/}
            <Button
              className={S.__d__toggler}
              variant="outlined"
              startIcon={<RiMenuLine />}
              onClick={openHandler}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 2,
                borderRadius: 0,
                color: "#FFF",
                borderColor: "#FFF",
              }}
            >
              MENU
            </Button>

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
              ISLAMER KANTHO
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
              ISLAMER KANTHO
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
export default Header;
