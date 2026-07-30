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
        <p className="p-10 text-center">Loading…</p>
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
