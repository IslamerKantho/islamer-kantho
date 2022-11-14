import { Row, Col, Carousel } from "antd";
import Image from "next/image";
import Container from "../container";
import { imageBuilder } from "../../pages/api/sanity";
import Link from "next/link";

export default function CarouselFullWidth({ dataSlides }) {
  // console.group('CarouselFullWidth')
  // console.log('Featured Post: ', dataSlides)
  // console.groupEnd()

  return (
    <>
      <section className="ik_full_width_carousel">
        <Container>
          <Row>
            <Col>
              <Carousel autoplay>
                {dataSlides &&
                  dataSlides.map((slide) => (
                    <div className="ik_slide">
                      <div className="ik_bg">
                        <Image
                          src={imageBuilder(slide.coverImage)
                            .width(1280)
                            .height(500)
                            .url()}
                          width={1280}
                          height={500}
                        />
                      </div>
                      <div className="ik_body">
                        <div className="ik_body_content">
                          <div>
                            <h3 title={slide?.title}>{slide?.title}</h3>
                            <p>{slide?.excerpt}</p>
                          </div>

                          <Link
                            as={`/article/${slide.slug}`}
                            href="/article/[slug]"
                          >
                            Read in details...
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .ik_slide {
          width: 100%;
          height: 100%;
          position: relative;
          display: block;
        }

        .ik_slide .ik_bg {
        }

        .ik_slide .ik_body {
          width: 1220px;
          height: 450px;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .ik_slide .ik_body .ik_body_content {
          height: calc(100% - 80px);
          width: 360px;
          margin: 40px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #fff;
        }
        .ik_slide h3 {
          margin-bottom: 20px;
          font-size: 24px;
          line-height: 32px;
          font-weight: 700;
          color: #000;
        }
        .ik_slide p {
          color: #2a2a2a;
          font-size: 14px;
          line-height: 24px;
          font-weight: 400;
          margin-bottom: 20px;
        }

        a {
          color: #000;
          font-size: 14px;
          line-height: 24px;
          font-weight: 700;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
