import SEO, { SITE_CONFIG } from "../../components/SEO";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import ArticleCover from "../../components/Article/ArticleCover";
import ArticleHeader from "../../components/Article/ArticleHeader";
import SingleArticleContent from "../../components/Article/SingleArticleContent";
import Layout from "../../components/Layout";
import { getAllPostsWithSlug, getPostAndMorePosts, getSiteSettings } from "../api/api";
import { imageBuilder } from "../api/sanity";
import ArchivePostCard from "../../components/card/ArchivePostCard";
import SocialShare from "../../components/Article/SocialShare";
import BlockPostCarSlider from "@/components/Block/BlockPostCarSlider";

export default function Post({ className, post, morePosts, settings, preview, ...rest }) {
  const router = useRouter();

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

  const readingTime = Math.max( 1, Math.ceil( JSON.stringify( post?.body || '' ).split( ' ' ).length / 250 ) );

  return (
    <Layout preview={preview} settings={settings}>
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
                        category={ post.categories || post.category }
                      date={post.date}
                      slug={post.slug}
                        readingTime={ readingTime }
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
                <div className="container max-w-4xl mx-auto">
                <SingleArticleContent content={post.body} />

                  { post.references && post.references.length > 0 && (
                    <div className="max-w-[610px] mx-auto mt-5">
                      <h3 className="text-[15px] font-bold text-slate-800 mb-3">* তথ্যসূত্র:</h3>
                      <ol className="space-y-1">
                        { post.references.map( ( link, idx ) => (
                          <li key={ idx }>
                            { link.url ? (
                              <a
                                href={ link.url }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                { link.title || link.url }
                              </a>
                            ) : (
                              <span className="text-slate-700">{ link.title || link }</span>
                            ) }
                          </li>
                        ) ) }
                      </ol>
                    </div>
                  ) }

                  <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col items-center justify-center">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">শেয়ার করুন</h4>
                    <SocialShare title={ post.title } slug={ post.slug } />
                  </div>
              </div>
            </section>

              <BlockPostCarSlider
                title="আরও পড়ুন"
                posts={ morePosts }
              />
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);

  if (!data?.post) {
    return { notFound: true };
  }

  const settings = await getSiteSettings(preview);

  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
      settings: settings || null,
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
