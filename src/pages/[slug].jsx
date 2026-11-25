import SEO, { SITE_CONFIG } from "../components/SEO";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import BlockPageHeader from "../components/Block/BlockPageHeader";
import SingleArticleContent from "../components/Article/SingleArticleContent";
import { getAllPagesWithSlug, getPageBySlug, getSiteSettings } from "./api/api";

export default function Page({ page, settings, preview }) {
  const router = useRouter();

  return (
    <Layout preview={preview} settings={settings}>
      {router.isFallback ? (
        <p className="p-10 text-center">Loading…</p>
      ) : (
        <>
          <SEO
            title={page.seo?.metaTitle || page.title}
            description={page.seo?.metaDescription}
            keywords={page.seo?.keywords?.join(', ')}
            canonicalUrl={`/${page.slug}`}
            ogType="website"
            ogImage={page.seo?.ogImageUrl}
            noIndex={page.seo?.noIndex}
          />
          <BlockPageHeader title={page.title} />

          <section className="py-8 md:py-11">
            <div className="container max-w-4xl mx-auto text-justify">
              <SingleArticleContent content={page.body} />
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const page = await getPageBySlug(params.slug, preview);

  if (!page || !page.body || page.body.length === 0) {
    return {
      notFound: true,
    };
  }

  const settings = await getSiteSettings(preview);

  return {
    props: {
      preview,
      page: page || null,
      settings: settings || null,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();
  return {
    paths:
      allPages?.map((page) => ({
        params: {
          slug: page.slug,
        },
      })) || [],
    fallback: true,
  };
}
