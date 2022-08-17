import { Box, Container, Link, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { imageBuilder } from "../../pages/api/sanity";

const HeroBanner = ({ className, post, ...rest }) => {
	return (
		<Box
			className={`ik_heroBanner${className ? className : ""}`}
			component="section"
			{...rest}>
			<Box className="ik_heroBanner__bg">
				<Image
					className="ik_heroBanner__bg__image"
					alt={post?.title}
					src={imageBuilder(post?.coverImage).height(450).width(1600).url()}
					layout="fill"
				/>
			</Box>

			<Box className="ik_heroBanner__content">
				<Container className="ik_heroBanner__content__container" maxWidth="lg">
					<NextLink
						as={`/article/${post.slug}`}
						href="/article/[slug]"
						passHref>
						<Typography
							className="ik_heroBanner__title"
							variant="h1"
							component={Link}>
							{post?.title}
						</Typography>
					</NextLink>

					<Typography
						className="ik_heroBanner__description"
						variant="body1"
						component="p">
						{post?.excerpt}
					</Typography>
				</Container>
			</Box>
		</Box>
	);
};

HeroBanner.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
	rest: PropTypes.object,
};

export default HeroBanner;
