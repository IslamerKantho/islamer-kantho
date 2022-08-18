import Head from "next/head";
import PropsType from "prop-types";
import BlockGridPostCard from "../../components/Block/BlockGridPostCard";
import Layout from "../../components/Layout";
import { SIDEBAR_CATAGORY } from "../../db/categories.db";
import { getAllPosts } from "../api/api";

const PageArticles = ({ allPosts, preview }) => {
	return (
		<>
			<Head>
				<title>আরটিকেল | ইসলামের কন্ঠ</title>
			</Head>

			<Layout preview={preview}>
				<BlockGridPostCard key={allPosts?._id} postData={allPosts} />
			</Layout>
		</>
	);
};

export async function getStaticProps({ params, preview = false }) {
	const allPostRange = [0, 12]; // Recent Article Range
	const allPosts = await getAllPosts(preview, allPostRange);
	return {
		props: { allPosts, preview },
		revalidate: 3600,
	};
}
export async function getStaticPaths() {
	const paths =
		SIDEBAR_CATAGORY.map((cat) => ({
			params: {
				slug: `${cat.slug}`,
			},
		})) || [];

	return {
		paths,
		fallback: true, // See the "fallback" section below
	};
}

PageArticles.propTypes = {
	allPosts: PropsType.object,
	preview: PropsType.bool,
};

export default PageArticles;
