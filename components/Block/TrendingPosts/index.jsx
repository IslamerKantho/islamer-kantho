import {
	Avatar,
	Box,
	Card,
	CardActionArea,
	Chip,
	Container,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import PropsType from "prop-types";
import React from "react";
import { imageBuilder } from "../../../pages/api/sanity";
import { dateFormatter } from "../../../utils/date.utils";

const TrendingPosts = ({ className, posts, ...rest }) => {
	return (
		<Box
			className={`ik_trendingPosts${className ? className : ""}`}
			component="section"
			{...rest}>
			<Container className="ik_trendingPosts__container" maxWidth="lg">
				<Grid className="ik_trendingPosts__row" container spacing={2}>
					{posts.map((post, index) => (
						<Grid
							className="ik_trendingPosts__col"
							key={index}
							item
							xs={12}
							sm={6}
							md={4}>
							<Card elevation={0} className="ik_trendingPosts__card">
								<CardActionArea className="ik_trendingPosts__action">
									<Box>
										<Chip
											className="ik_trendingPosts__date"
											label={dateFormatter(
												post?.date?.updatedAt
													? post?.date?.updatedAt
													: post?.date?.createdAt
											)}
											size="small"
										/>

										<Typography
											className="ik_trendingPosts__title"
											variant="h5"
											component="h2">
											{post?.title}
										</Typography>
									</Box>

									<Stack
										className="ik_trendingPosts__meta"
										direction="row"
										spacing={2}>
										<Avatar
											className="ik_trendingPosts__avatar"
											src={imageBuilder(post?.author?.image)
												.width(20)
												.height(20)
												.url()}
										/>
										<Typography
											className="ik_trendingPosts__author__name"
											variant="body2">
											{post?.author?.name} • {post?.category?.title}
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

TrendingPosts.PropsType = {
	className: PropsType.string,
	posts: PropsType.array,
	rest: PropsType.object,
};

export default TrendingPosts;
