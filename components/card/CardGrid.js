// API
import { imageBuilder } from "../../pages/api/sanity";
// Components
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

export default function CardGrid({ cardData }) {
	const article = cardData;

	return (
		<article className="post_grid_card" key={article.slug}>
			<NextLink as={`/article/${article.slug}`} href="/article/[slug]">
				<Card
					sx={{
						width: "100%",
						background: "#fff",
						borderRadius: "5px",
						boxShadow: "0px 0px 20px 0 rgb(0 0 0 / 15%)",
					}}>
					<CardActionArea>
						<Box
							className="img ik_rounded-md"
							sx={{ borderBottom: "8px solid #055547" }}>
							{/* <Image src={imageBuilder(article.coverImage).width(286).height(161).url()} width={286} height={161} layout="responsive" alt={article.slug} /> */}
							{article.coverImage && (
								<Image
									src={imageBuilder(article?.coverImage)
										.width(286)
										.height(161)
										.url()}
									width={286}
									height={161}
									layout="responsive"
									alt={article.slug}
									placeholder="blur"
									blurDataURL={imageBuilder(article?.coverImage)
										.width(286)
										.height(161)
										.url()}
								/>
							)}
						</Box>
						<CardContent
							sx={{
								padding: "20px",
								background: "#fff",
							}}>
							{/* Meta */}
							<Typography
								variant="body1"
								className="ik_meta__writer"
								sx={{
									fontSize: "13px",
									lineHeight: "22px",
									color: "text.primary",
									textDecoration: "none",
								}}>
								হাফিজ মাওলানা মাহমুদুর রহমান
							</Typography>

							{/* Title */}
							<Typography
								variant="h3"
								className="ik_meta__title"
								sx={{
									marginTop: "8px",
									fontSize: "15px",
									lineHeight: "24px",
									fontWeight: "bold",
									color: "#055547",
								}}>
								{article.title}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</NextLink>
		</article>
	);
}
