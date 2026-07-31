import ErrorPage from "next/error";
import SEO, { SITE_CONFIG } from "../../components/SEO";
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

  const articleUrl = post?.slug ? `${SITE_CONFIG.domain}/article/${post.slug}` : SITE_CONFIG.domain;
  const imageUrl = post?.coverImage
    ? imageBuilder(post.coverImage).url()
    : SITE_CONFIG.defaultOgImage;

  const articleJsonLd = post?.slug
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        "headline": post.title,
        "description": post.excerpt || "",
        "image": imageUrl ? [imageUrl] : undefined,
        "inLanguage": "bn",
        "datePublished": post?.date?.createdAt || undefined,
        "dateModified": post?.date?.updatedAt || post?.date?.createdAt || undefined,
        "author": post?.author?.name
          ? {
              "@type": "Person",
              "name": post.author.name,
            }
          : {
              "@type": "Organization",
              "name": SITE_CONFIG.siteName,
              "url": SITE_CONFIG.domain,
            },
        "publisher": {
          "@type": "Organization",
          "name": SITE_CONFIG.siteName,
          "url": SITE_CONFIG.domain,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_CONFIG.domain}/img/branding/favicon.png`,
          },
        },
      }
    : null;

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <p className="p-10 text-center">Loading…</p>
      ) : (
        <>
          <SEO
            title={post.seo?.metaTitle || post.title}
            description={post.seo?.metaDescription || post.excerpt}
            keywords={post.seo?.keywords?.join(', ')}
            canonicalUrl={`/article/${post.slug}`}
            ogType="article"
            ogImage={post.seo?.ogImageUrl || imageUrl}
            publishedTime={post.publishedAt || post?.date?.createdAt}
            modifiedTime={post?.date?.updatedAt || post.publishedAt || post?.date?.createdAt}
            authorName={post?.author?.name}
            categoryName={post?.categories?.title || post?.category?.title}
            noIndex={post.seo?.noIndex}
            jsonLd={articleJsonLd}
          />

          <article className={className} {...rest}>
            <section className="ik_article_header py-5 md:py-14">
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  <div className="md:col-span-5">
                    <ArticleHeader
                      title={post.title}
                      excerpt={post.excerpt}
                      author={post.author}
                      category={post.categories}
                      date={post.date}
                      slug={post.slug}
                    />
                  </div>

                  <div className="md:col-span-7">
                    <ArticleCover src={post.coverImage} title={post.title} />
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section className="ik_sarticle_content py-5 md:py-10">
              <div className="container">
                <SingleArticleContent content={post.body} />
              </div>
            </section>
          </article>
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

Post.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  morePosts: PropTypes.array,
  preview: PropTypes.bool,
};
