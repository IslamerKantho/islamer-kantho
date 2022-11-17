import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
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
import { SIDEBAR_CATAGORY, SIDEBAR_LINKS } from "../../db/categories.db";
import { FaHotjar } from "react-icons/fa";
import { IconContext } from "react-icons";

const MenuDrawer = ({ isVisible, openHandler, closeHandler }) => {
  const toggleDrawer = (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }

    closeHandler();
  };

  const list = (
    <Box
      width={{ xs: "100%", sm: "400px" }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
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
        <Toolbar disableGutters variant="dense">
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
            sx={{ ml: "auto", mr: 2 }}
            variant="text"
            component="label"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <List>
        {SIDEBAR_CATAGORY.map((el, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              href={`/category/${el.slug}`}
              component={NextLink}
              sx={{
                padding: "8px 2 8px 2",
                borderBottom: "1px solid rgb(233, 236, 239)",
                transition: "all .2s ease,visibility 0s",
                "&:hover": {
                  color: "#055547",
                  paddingLeft: "20px",
                  // background: "#055547",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {/* <IconContext.Provider> */}
                <FaHotjar />
                {/* </IconContext.Provider> */}
              </ListItemIcon>

              <ListItemText
                primary={el.title}
                sx={{
                  // fontSize: "14px",
                  // lineHeight: "21px",
                  color: "#818181",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* <Divider /> */}

      <List>
        {SIDEBAR_LINKS.map((el, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={el.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
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

  return (
    <>
      <Drawer
        anchor="left"
        open={isVisible}
        onClose={closeHandler}
        PaperProps={{
          sx: {
            maxWidth: { xs: "100%", sm: 400 },
          },
        }}
      >
        {list}

        {/* Footer */}
        {footer}
      </Drawer>
    </>
  );
};

export default MenuDrawer;
