import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import NextLink from "next/link";
import {
  SIDE_MENU,
} from "../../db/categories.db";
import daynamic from "next/dynamic";
import { memo } from "react";
const ListMenu = daynamic(() => import("./ListMenu"));

const MenuDrawer = ({ isVisible,  closeHandler }) => {
  const toggleDrawer = (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }

    closeHandler();
  };

  const topBar = (
    <AppBar
      position="sticky"
      sx={{
        width: { xs: "100%", sm: "400px" },
          color: "#fff",
        background: "#055547",
        boxShadow: "none",
        pl: 2,
        borderBottom: "1px solid rgb(233, 236, 239)",
      }}
    >
      <Toolbar
        disableGutters
        variant="dense"
        role=""
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <NextLink href="/" passHref>
          <Typography
            variant="h6"
            noWrap
            href={"/"}
            component="a"
            sx={{
              mr: 2,
              color: "#fff",
              display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "36px",
              textDecoration: "none",
            }}
          >
            ইসলামের কন্ঠ
          </Typography>
        </NextLink>

        <IconButton
          variant="text"
          component="label"
          sx={{
            ml: "auto",
            mr: 2,
            color: "#fff",
          }}
        >
          {/* <IconContext.Provider> */}
          <CloseIcon
            sx={{
              padding: "2px",
              borderRadius: "50%",
              background: "#03483c",
            }}
          />
          {/* </IconContext.Provider> */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const footer = (
    <>
      <Box
        sx={{
          width: "70%",
          margin: "25px auto 10px auto",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" gutterBottom>
          All right reserved by the author & the respective writers
        </Typography>
      </Box>
    </>
  );

  // <Divider />

  return (
    <>
      <Drawer
        anchor="left"
        open={isVisible}
        onClose={closeHandler}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            maxWidth: { xs: "100%", sm: 400 },
            overflowX: "hidden",
          },
        }}
      >
        {topBar} {/* Top Bar */}
        {Object.keys(SIDE_MENU).map((k, i) =>
          SIDE_MENU[k].list ? (
            <ListMenu
              key={i}
              title={SIDE_MENU[k].title}
              list={SIDE_MENU[k].list}
              color={SIDE_MENU[k].color}
            />
          ) : (
            <></>
          )
        )}
        {footer}
      </Drawer>
    </>
  );
};

export default memo(MenuDrawer);
