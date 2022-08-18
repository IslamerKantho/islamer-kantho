import Link from "next/link";
import PropTypes from "prop-types";
import ScrollContainer from "react-indiana-drag-scroll";
import Container from "../container";

export default function SecondaryNavigation({
	className,
	data,
	preview,
	...rest
}) {
	return (
		<>
			<nav
				className={`ik_nav_secondery ${className}`}
				preview={preview}
				{...rest}>
				<Container dataClasses="mx_auto">
					<div className="ik_text-center">
						<ScrollContainer className="scroll-container">
							<div className="ik_inline_menu">
								<Link href={`/`}>
									<a>আমালিয়াত</a>
								</Link>
								<Link href={`/`}>
									<a>ইসলামি আদাব (শিষ্টাচার)</a>
								</Link>
								<Link href={`/`}>
									<a>ইসলামি প্রবন্ধ</a>
								</Link>
								<Link href={`/`}>
									<a>ইসলামি সাহিত্য</a>
								</Link>
								<Link href={`/`}>
									<a>ওয়াজ</a>
								</Link>
								<Link href={`/`}>
									<a>কবিতা</a>
								</Link>
								<Link href={`/`}>
									<a>কোরআন</a>
								</Link>
								<Link href={`/`}>
									<a>দারসুল কোরআন</a>
								</Link>
								<Link href={`/`}>
									<a>দারসুল হাদীস</a>
								</Link>
								<Link href={`/`}>
									<a>মাসয়ালা</a>
								</Link>
								<Link href={`/`}>
									<a>সমসাময়িক আলোচনা</a>
								</Link>
								<Link href={`/`}>
									<a>হাদীস</a>
								</Link>
							</div>
						</ScrollContainer>
					</div>
				</Container>
			</nav>

			<style jsx>{`
				a {
					text-decoration: none;
				}

				.ik_nav_secondery {
					width: 100%;
					background: #055547;
					border-bottom: 1px solid rgb(242, 242, 247);
				}

				.ik_inline_menu {
					width: 100%;
					display: flex;
					align-items: center;
					overflow-y: auto;
				}
				.ik_inline_menu a:first-of-type {
					padding-left: 0;
				}

				.ik_inline_menu a {
					margin: 8px 15px 8px 0;
					color: #fff;
					font-size: 13px;
					display: flex;
					flex: 0 0 auto;
					position: relative;
				}
				.ik_inline_menu a:hover {
					color: rgba(255, 255, 255, 0.7);
				}
			`}</style>
		</>
	);
}

SecondaryNavigation.propTypes = {
	className: PropTypes.string,
	data: PropTypes.array,
	preview: PropTypes.bool,
	rest: PropTypes.object,
};
