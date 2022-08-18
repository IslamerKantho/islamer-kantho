import { Box, Container, Divider, Grid } from "@mui/material";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ArticleCover from "../../components/Article/ArticleCover";
import ArticleHeader from "../../components/Article/ArticleHeader";
import SingleArticleContent from "../../components/Article/SingleArticleContent";
import Layout from "../../components/Layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../api/api";
import { imageBuilder } from "../api/sanity";

export default function Post({ className, post, morePosts, preview, ...rest }) {
	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={preview}>
			{router.isFallback ? (
				<p>Loading…</p>
			) : (
				<>
					<Head>
						<title>{post.title} | ইসলামের কন্ঠ</title>

						<meta property="og:title" content={post.title} />
						<meta property="og:site_name" content="ইসলামের কন্ঠ" />
						<meta
							property="og:url"
							content={`https://islamerkantho.com/article/${post.slug}`}
						/>
						<meta property="og:description" content={post.excerpt} />
						<meta property="og:type" content="article" />
						<meta
							property="og:image"
							content={imageBuilder(post.coverImage).url()}
						/>

						{/* Google JSON+ID */}
						<script type="application/ld+json">
							{`{
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "http://islamerkantho.com/article/${post.slug}"
                  },
                  "headline": "${post.title}",
                  "description": "${post.excerpt}",
                  "image": "${imageBuilder(post.coverImage).url()}",  
                  "author": {
                    "@type": "Organization",
                    "name": "ইসলামের কন্ঠ"
                  },  
                  "publisher": {
                    "@type": "Organization",
                    "name": "ইসলামের কন্ঠ",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://islamerkantho.com/img/branding/favicon.png"
                    }
                  },
                  "datePublished": "${post.date.createdAt}",
                  "dateModified": "${post.date.updatedAt}"
                }`}
						</script>
					</Head>

					<Box component="article" className={className} {...rest}>
						<Box className="ik_article_header" component="section">
							<Container
								maxWidth="lg"
								sx={{
									paddingTop: "60px",
									paddingBottom: "60px",
								}}>
								<Grid container spacing={5}>
									<Grid
										item
										xs={12}
										md={5}
										sm={12}
										justifyContent="center"
										alignItems="center">
										<ArticleHeader
											title={post.title}
											excerpt={post.excerpt}
											author={post.author}
											category={post.categories}
											date={post.date}
										/>
									</Grid>

									<Grid item xs={12} md={7} sm={12}>
										<ArticleCover src={post.coverImage} title={post.title} />
									</Grid>
								</Grid>
							</Container>
						</Box>

						<Divider />

						<Box className="ik_sarticle_content" component="section">
							<Container>
								<Grid container justify="center" align="middle">
									<Grid item lg={24} md={24} sm={24}>
										<SingleArticleContent content={post.body} />
									</Grid>
								</Grid>
							</Container>
						</Box>
					</Box>

					{/* <Comments comments={post.comments} />
            <Form _id={post._id} />

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
				</>
			)}
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const data = await getPostAndMorePosts(params.slug, preview);
	return {
		props: {
			preview,
			post: data?.post || null,
			morePosts: data?.morePosts || null,
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const allPosts = await getAllPostsWithSlug();
	return {
		paths:
			allPosts?.map((post) => ({
				params: {
					slug: post.slug,
				},
			})) || [],
		fallback: true,
	};
}

Post.prototype = {
	className: PropTypes.string,
	post: PropTypes.object,
	morePosts: PropTypes.array,
	preview: PropTypes.bool,
	rest: PropTypes.object,
};
