import CloseIcon from "@mui/icons-material/Close";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  IconButton,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import NextLink from "next/link";
import {
  SIDEBAR_CATAGORY,
  SIDEBAR_LINKS,
  SIDE_MENU,
} from "../../db/categories.db";
import { FaHotjar } from "react-icons/fa";
import { IconContext } from "react-icons";
import ListMenu from "./ListMenu";

const MenuDrawer = ({ isVisible, openHandler, closeHandler }) => {
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
        background: "#FFF",
        boxShadow: "none",
        pl: 2,
        borderBottom: "1px solid rgb(233, 236, 239)",
      }}
    >
      <Toolbar
        disableGutters
        variant="dense"
        role="presentation"
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
              color: "#000000",
              display: "flex",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "36px",
              textDecoration: "none",
            }}
          >
            ISLAMER KANTHO
          </Typography>
        </NextLink>

        <IconButton
          variant="text"
          component="label"
          sx={{
            ml: "auto",
            mr: 2,
          }}
        >
          {/* <IconContext.Provider> */}
          <CloseIcon
            sx={{
              padding: "2px",
              borderRadius: "50%",
              background: "#e3e3e3",
            }}
          />
          {/* </IconContext.Provider> */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const options = (
    <List>
      {SIDEBAR_LINKS.map((el, i) => (
        <ListItem key={i} disablePadding>
          <ListItemButton sx={{ py: 0.5, minHeight: 32, color: "#e3e3e3" }}>
            <ListItemIcon
              sx={{
                color: "inherit",
              }}
            >
              <InboxIcon
                sx={{
                  width: "30px",
                  height: "30px",
                  padding: "4px",
                  borderRadius: "50%",
                  color: "#1A1A1A",
                  background: "#e3e3e3",
                }}
              />
            </ListItemIcon>
            <ListItemText primary={el.title} sx={{ color: "#383838" }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
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
            display: "block",
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
            />
          ) : (
            <></>
          )
        )}
        {/* {cats} */}
        {/* {list} */}
        {/* <Cats />  */}
        {/* Footer */}
        {footer}
      </Drawer>
    </>
  );
};

export default MenuDrawer;
