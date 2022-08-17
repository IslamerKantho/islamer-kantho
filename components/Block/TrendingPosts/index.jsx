import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	Container,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";

const TrendingPosts = ({ posts }) => {
	console.log("FEATURED POST: ", posts);
	return (
		<Box
			className="ik_trending__posts"
			sx={{
				paddingTop: "40px",
				paddingBottom: "40px",
				borderBottom: "1px solid rgb(230, 230, 230)",
			}}>
			<Container maxWidth="lg">
				<Grid container spacing={2}>
					{posts.map((post, index) => (
						<Grid key={index} item xs={12} sm={6} md={4}>
							<Card elevation={0}>
								<CardActionArea
									sx={{
										padding: "20px",
										backgroundColor: "#f5f5f5",
										color: "#262626",
									}}>
									<Typography
										variant="h6"
										sx={{
											fontSize: "13px",
											lineHeight: "13px",
											color: "#595959",
										}}>
										17 Aug 2022
									</Typography>
									<Typography
										variant="h5"
										component="h2"
										sx={{
											marginTop: "10px",
											fontSize: "15px",
											lineHeight: "23px",
											color: "black",
											fontWeight: 700,
										}}>
										আল-আশরাত্ব : হাদিসে বর্ণিত কিয়ামতের আলামত
									</Typography>
									<Stack
										className="ik_card__meta"
										direction="row"
										spacing={2}
										sx={{ marginTop: "10px" }}>
										<Avatar
											src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
											sx={{
												height: "20px",
												width: "20px",
											}}
										/>
										<Typography
											variant="body2"
											sx={{
												fontSize: "13px",
												lineHeight: "13px",
												color: "#595959",
											}}>
											Abu Taher Muhammad in আল হাদিস
										</Typography>
									</Stack>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default TrendingPosts;
