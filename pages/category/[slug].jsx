import Head from "next/head";
import PropsType from "prop-types";
import BlockGridPostCard from "../../components/Block/BlockGridPostCard";
import Layout from "../../components/Layout";
import { SIDEBAR_CATAGORY } from "../../db/categories.db";
import { getAllPosts } from "../api/api";

const PageArticles = ({ posts, length, preview }) => {
  return (
    <>
      <Head>
        <title>আরটিকেল | ইসলামের কন্ঠ</title>
      </Head>

      <Layout preview={preview}>
        <BlockGridPostCard posts={posts} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const preview = false;
  console.log(ctx.query);
  const allPostRange = [0, 12]; // Recent Article Range
  const { data, length } = await getAllPosts(preview, allPostRange);

  return {
    props: { posts: data, length, preview },
  };
}
// export async function getStaticPaths() {
//   const paths =
//     SIDEBAR_CATAGORY.map((cat) => ({
//       params: {
//         slug: `${cat.slug}`,
//       },
//     })) || [];

//   return {
//     paths,
//     fallback: true, // See the "fallback" section below
//   };
// }

PageArticles.propTypes = {
  allPosts: PropsType.object,
  preview: PropsType.bool,
};

export default PageArticles;
