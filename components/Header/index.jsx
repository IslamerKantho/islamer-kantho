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
import { useEffect, useState } from "react";
import MenuDrawer from "../MenuDrawer";

const pages = ["Editoral", "About", "Contact"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
	const [backgrund, setBackgrund] = useState("#055547");
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [isCatDrawerOpen, setIsCatDrawerOpen] = useState(false);

	useEffect(() => {
		document.onscroll = () => {
			console.log(window.scrollX);
		};
	}, []);

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
					background: backgrund,
					borderBottom: "1px solid #000",
					boxShadow: "none",
				}}>
				<Container maxWidth="xl">
					<Toolbar disableGutters variant="dense">
						{/* Desktop Category Drawer Toggle Button */}
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
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
								}}>
								LOGOO
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
									horizontal: "center",
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
									marginLeft: "auto",
									marginRight: "auto",
								}}>
								{pages.map((page) => (
									<MenuItem
										key={page}
										onClick={handleCloseNavMenu}
										sx={{ borderRight: "1px solid #ffffff" }}>
										<Typography textAlign="center">{page}</Typography>
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
							href=""
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}>
							LOGO
						</Typography>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
								gap: 2,
								alignItems: "center",
								paddingRight: 20,
								// justifyContent: "space-between",
							}}>
							{pages.map((page) => (
								<Link
									href="#"
									underline="none"
									key={page}
									sx={{
										// marginLeft: 2,
										paddingRight: 1.5,
										color: "white",
										display: "block",
										fontWeight: 500,
										borderRight: "1px solid #fff",
										"&:first-of-type": {
											marginLeft: "auto",
											paddingLeft: 1.5,
											borderLeft: "1px solid #fff",
										},
										borderRight: "1px solid #fff",
										"&:last-of-type": {
											marginRight: "auto",
										},
									}}>
									{page}
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
			/>
		</>
	);
};
export default Header;
