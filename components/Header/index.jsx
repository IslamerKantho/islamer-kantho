import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useState } from "react";
import MenuDrawer from "../MenuDrawer";

const pages = [
	{
		title: "Editorial",
		url: "/",
	},
	{ title: "About", url: "/" },
	{ title: "Contact", url: "" },
	{ title: "Donate", url: "" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
	const [background, setBackground] = useState("#055547");
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [isCatDrawerOpen, setIsCatDrawerOpen] = useState(false);

	const openHandler = () => setIsCatDrawerOpen(true);
	const closeHandler = () => setIsCatDrawerOpen(false);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
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
				}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters variant="dense">
						{/* Desktop Category Drawer Toggler */}
						<Button
							variant="outlined"
							startIcon={<MenuIcon />}
							onClick={openHandler}
							sx={{
								display: { xs: "none", md: "flex" },
								mr: 2,
								borderRadius: 0,
								color: "#FFF",
								borderColor: "#FFF",
							}}>
							MENU
						</Button>

						{/* Brand Logo for desktop */}
						<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
						<NextLink href="/" passHref>
							<Typography
								variant="h6"
								noWrap
								href={"/"}
								component="a"
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									fontWeight: 700,
									color: "inherit",
									textDecoration: "none",
								}}>
								ISLAMER KANTHO
							</Typography>
						</NextLink>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								// onClick={handleOpenNavMenu}
								onClick={openHandler}
								color="inherit">
								<MenuIcon />
							</IconButton>

							{/* Desktop menu */}
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
									marginLeft: 0,
									marginRight: "auto",
								}}>
								{pages.map((page, i) => (
									<MenuItem
										key={i}
										onClick={handleCloseNavMenu}
										sx={{
											fontWeight: "700",
											fontSize: "14px",
											lineHeight: "21px",
										}}>
										<Typography textAlign="center">{page.title}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>

						{/* Brand logo for phone */}
						<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontWeight: 700,
								color: "inherit",
								textDecoration: "none",
							}}>
							Islamer Kantho
						</Typography>

						{/* Desktop menu */}
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
								gap: "20px",
								alignItems: "center",
								paddingLeft: "25px",
								paddingRight: 20,
								// borderLeft: "1px solid #fff",
								// justifyContent: "space-between",
							}}>
							{pages.map((page, i) => (
								<Link
									href={pages.url}
									underline="none"
									key={i}
									sx={{
										// marginLeft: "20px",
										// paddingRight: 1.5,
										color: "white",
										fontSize: "13px",
										lineHeight: "21px",
										display: "block",
										fontWeight: 700,
										// borderRight: "1px solid #fff",
										"&:first-of-type": {},
										// borderRight: "1px solid #fff",
										"&:last-of-type": {
											marginRight: "auto",
										},
										":hover": {
											color: "#FFF",
											opacity: 0.8,
										},
									}}>
									{page.title}
								</Link>
							))}
						</Box>

						{/* Desktop Toolbar Profile Area */}
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0, width: 20, height: 20 }}>
									<Avatar
										sx={{ p: 0, width: 30, height: 30 }}
										alt="Remy Sharp"
										src="/static/images/avatar/2.jpg"
									/>
								</IconButton>
							</Tooltip>

							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						{/* --/-- */}
					</Toolbar>
				</Container>
			</AppBar>

			<MenuDrawer
				isVisible={isCatDrawerOpen}
				openHandler={openHandler}
				closeHandler={closeHandler}
				sx={{ width: "300px" }}
			/>
		</>
	);
};
export default Header;
