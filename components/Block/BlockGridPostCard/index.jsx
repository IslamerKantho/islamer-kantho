import { Box, Container, Grid, Typography } from "@mui/material";
import CardGrid from "../../card/CardGrid";

export default function BlockGridPostCard({ postData, sectionTitle }) {
	const allPosts = postData;

	return (
		<>
			<section className="ik_recomendetion">
				<Container maxWidth="lg">
					{sectionTitle && (
						<Box className="ik__header">
							<Typography
								variant="h4"
								component="h4"
								sx={{
									color: "#055547",
									fontSize: "25px",
									lineHeight: "30px",
									fontWeight: "bold",
								}}>
								{sectionTitle.text}
							</Typography>
						</Box>
					)}

					<Box className="ik__body " sx={{ marginTop: "20px" }}>
						<Grid container spacing={2}>
							{allPosts &&
								allPosts.map((article) => (
									<Grid
										item
										key={article._id}
										sx={12}
										md={3}
										sx={{ width: "100%" }}>
										<CardGrid cardData={article} />
									</Grid>
								))}
						</Grid>
					</Box>
				</Container>
			</section>

			<style jsx>{`
				@media (max-width: 767px) {
					.ik_recomendetion {
						/* margin-left: 20px; */
						/* margin-right: 20px; */
					}
				}
			`}</style>
		</>
	);
}
