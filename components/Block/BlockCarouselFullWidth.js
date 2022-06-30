import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import { imageBuilder } from "../../pages/api/sanity";
import Container from "../container";

export default function BlockCarouselFullWidth({ dataSlides }) {
	// console.group('CarouselFullWidth')
	// console.log('Featured Post: ', dataSlides)
	// console.groupEnd()

	return (
		<>
			<section className="ik_full_width_carousel ik_mt-6">
				<Container dataClasses="mx_auto">
					<Carousel autoplay>
						{dataSlides &&
							dataSlides.map((slide, i) => (
								<div className="ik_slide" key={i}>
									<div className="ik_bg">
										<Image
											src={imageBuilder(slide.coverImage)
												.width(1280)
												.height(500)
												.url()}
											width={1280}
											height={500}
											alt={slide.slug}
										/>
									</div>
									<div className="ik_body">
										<div className="ik_body_content">
											<div>
												<h3 className="title" title={slide?.title}>
													{slide?.title}
												</h3>
												<p className="excerpt">{slide?.excerpt}</p>
											</div>

											<Link
												as={`/article/${slide.slug}`}
												href="/article/[slug]">
												<a className="readmore">Read in details...</a>
											</Link>
										</div>
									</div>
								</div>
							))}
					</Carousel>
				</Container>
			</section>
		</>
	);
}
