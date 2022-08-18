import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { imageBuilder } from "../../../pages/api/sanity";

const CardFullWide = ({ className, postData, ...rest }) => {
	return (
		<Card
			className={`ik_c__fullCard ${className ? className : ""}`}
			elevation={0}
			component="article"
			{...rest}>
			<Box className="ik_fullCard__container">
				{postData.coverImage && (
					<CardMedia
						className="ik_fullCard__thumbnail"
						alt="Live from space album cover"
						sx={{ width: "330px" }}>
						{/* <Image src={ imageBuilder(postData?.coverImage).width(286).height(180).url() } width={286} height={180} layout="responsive" alt={postData?.slug} /> */}

						<Image
							src={imageBuilder(postData?.coverImage)
								.width(286)
								.height(180)
								.url()}
							width={286}
							height={180}
							layout="responsive"
							alt={postData?.title}
							placeholder="blur"
							blurDataURL={imageBuilder(postData?.coverImage)
								.width(286)
								.height(180)
								.url()}
						/>
					</CardMedia>
				)}

				<CardContent className="ik_fullCard__body">
					<Box className="ik_fullCard__meta">
						<Chip
							className="ik_fullCard__meta__cat"
							label={postData?.category?.title}
							size="small"
						/>
					</Box>

					<NextLink
						as={`/article/${postData?.slug}`}
						href={`/article/[slug]`}
						passHref>
						<Typography
							variant="h3"
							// component="a"
							className="ik_fullCard__title">
							{postData?.title}
						</Typography>
					</NextLink>

					<Typography
						variant="body1"
						className="ik_fullCard__description"
						// noWrap
					>
						{postData?.excerpt}
					</Typography>
				</CardContent>
			</Box>
		</Card>
	);
};

export default CardFullWide;
