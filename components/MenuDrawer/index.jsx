import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NextLink from "next/link";
import { SIDEBAR_CATAGORY, SIDEBAR_LINKS } from "../../db/categories.db";

const MenuDrawer = ({ isVisible, openHandler, closeHandler }) => {
	const toggleDrawer = (e) => {
		if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
			return;
		}

		closeHandler();
	};

	const list = () => (
		<Box
			sx={{ width: "100%" }}
			role="presentation"
			onClick={toggleDrawer}
			onKeyDown={toggleDrawer}>
			<List>
				{SIDEBAR_CATAGORY.map((el, i) => (
					<ListItem key={i} disablePadding>
						<ListItemButton
							component="li"
							// href={el.url}
							sx={{
								padding: 1,
								borderBottom: "1px solid #055547",
								transition: "all .2s ease,visibility 0s",
								position: "relative",
								display: "block",
								fontWeight: 500,
								"&:hover": {
									color: "#055547",
									paddingLeft: "20px",
									// background: "#055547",
								},
							}}>
							{/* <ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon> */}
							<NextLink href={el.url} passHref>
								<ListItemText primary={el.title} />
							</NextLink>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
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
	const footer = () => (
		<>
			<Box
				sx={{
					width: "70%",
					margin: "25px auto 10px auto",
					textAlign: "center",
				}}>
				<Typography variant="body2" gutterBottom>
					All right reserved by the author & the respective writers
				</Typography>
			</Box>
		</>
	);

	return (
		<>
			<Drawer
				sx={{
					width: "300px",
				}}
				anchor="left"
				open={isVisible}
				onClose={closeHandler}>
				{list()}

				{/* Footer */}
				{footer()}
			</Drawer>
		</>
	);
};

export default MenuDrawer;
