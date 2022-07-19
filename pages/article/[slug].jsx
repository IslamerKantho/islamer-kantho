import { Col, Divider, Row } from "antd";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import ArticleCover from "../../components/Article/ArticleCover";
import ArticleHeader from "../../components/Article/ArticleHeader";
import SingleArticleContent from "../../components/Article/SingleArticleContent";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../api/api";
import { imageBuilder } from "../api/sanity";

export default function Post({ post, morePosts, preview }) {
	// console.group('[slug].js')
	// console.log('Post: ', post)
	// console.groupEnd()

	const router = useRouter();
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={preview}>
			{/* <Container> */}
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

					<article>
						<section className="ik_article_header">
							<Container>
								<Row>
									<Col lg={9} md={9} sm={24}>
										<ArticleHeader
											title={post.title}
											excerpt={post.excerpt}
											author={post.author}
											category={post.categories}
											date={post.date}
										/>
									</Col>

									<Col lg={14} md={14} sm={24} offset={{ lg: 1, md: 1, sm: 0 }}>
										<ArticleCover src={post.coverImage} title={post.title} />
									</Col>
								</Row>
							</Container>
						</section>

						<Divider />

						<section className="ik_sarticle_content">
							<Container>
								<Row justify="center" align="middle">
									<Col lg={24} md={24} sm={24}>
										<SingleArticleContent content={post.body} />
									</Col>
								</Row>
							</Container>
						</section>
					</article>

					{/* <Comments comments={post.comments} />
            <Form _id={post._id} />

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}

					<style jsx>{`
						.ik_article_header {
							padding-top: 80px;
							padding-bottom: 40px;
						}
					`}</style>
				</>
			)}
			{/* </Container> */}
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
