import { getCategoryList } from "../../pages/api/api";
import "../../styles/NavigationHeader.module.sass";
import PrimaryNavigation from "./PrimaryNavigation";
import SecondaryNavigation from "./SeconderyNavigation";

export default function NavigationHeader({
	className,
	categories,
	preview,
	...rest
}) {
	return (
		<>
			<header
				className={`ik_nav_header ik_divide-solid ${className}`}
				{...rest}>
				<PrimaryNavigation />
				<SecondaryNavigation data={(categories, preview)} />
			</header>

			<style jsx>{`
				.ik_nav_header {
					background: #fff;
				}
			`}</style>
		</>
	);
}

export async function getStaticProps({ preview = false }) {
	const categories = await getCategoryList(preview);

	return {
		props: { categories, preview },
		revalidate: 1,
	};
}

NavigationHeader.propTypes = {
	className: PropTypes.string,
	categories: PropTypes.array,
	preview: PropTypes.bool,
	rest: PropTypes.object,
};
