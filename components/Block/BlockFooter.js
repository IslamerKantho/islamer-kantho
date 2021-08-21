import Container from '../container'
import Image from 'next/image'
import Link from 'next/link'
import FormSubscribeMini from '../Form/FormSubscribeMini'
import { Layout, Row, Col } from 'antd'


export default function BlockFooter() {
    const { Footer } = Layout

    return (
        <>
            <Footer>
                <Container>
                    <Row>
                        <Col lg={8} md={8} sm={24}>
                            <div className="ik_footer_weidget">
                                <Image src={`/logo.png`} height="34.8" width="184" />
                                <p >ইসলামের কন্ঠ” এর মাধ্যমে জনসম্মুখে ‘আহলে সুন্নাত ওয়াল জামাআত এর আক্বীদাহ অনুযায়ী ইসলামের সঠিক চিত্র উপস্থাপন, সেই সাথে অপব্যাখ্যা ও ভ্রান্ত ধারনা নিরসনের লক্ষ্যে কাজ করা আমাদের একমাত্র উদ্দেশ্য।</p>
                            </div>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <div className="ik_flex ik_justify_center">
                                <ul className="ik__list ik_list_0">
                                    <li>
                                        <Link href={`/`}>
                                            <a>
                                                About us
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link href={`/`}>
                                            <a>
                                                Contact us
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link href={`/`}>
                                            <a>
                                                Newsroom
                                            </a>
                                        </Link>
                                    </li>
                                </ul>

                                <ul className="ik__list ik_list_0">
                                    <li>
                                        <Link href={`/`}>
                                            <a>
                                                Contribute
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link href={`/`}>
                                            <a>
                                                Advertising
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link href={`/`}>
                                            <a>
                                                Privacy Policy
                                            </a>
                                        </Link>
                                    </li>
                                    
                                    <li>
                                        <Link href={`/`}>
                                            <a>
                                                Terms
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <div className="ik_widget_subscribe">
                                <h5>Sign up for our newsletter!</h5>
                                <p className="mb__20">Join our mailing list and get the latest updates</p>
                                <FormSubscribeMini />
                                <p className="mt__20">Email us for general inquiries and copyright information</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Footer>

            <style jsx>{`
                p {
                    font-size: 12px;
                    line-height: 18px;
                    color: #aeaeb2;
                }
                a {
                    text-decoration: none;
                }

                footer {
                    padding: 40px 0;
                    width: 100%;
                    background-color: rgb(0, 0, 0);
                    color: rgb(142, 142, 147);
                }
                .ik_container_left {
                    width: calc(100% / 3 );
                }
                .ik_container_middle {
                    width: calc(100% / 3 );
                }
                .ik_container_right {
                    width: 270px;
                }

                .ik_container_left p {
                    margin: 20px 0px 40px;
                    color: rgb(174, 174, 178);
                    font-size: 12px;
                    line-height: 1.7;
                }

                .ik__list {
                    margin-right: 58px;
                }
                .ik__list:last-of-type {
                    margin-right: 0;
                }
                .ik__list li {
                    margin-right: 58px;
                    font-size: 12px;
                    margin: 0px 15px 20px;
                    text-transform: capitalize;
                }
                .ik__list li a {
                    color: rgb(255, 255, 255);
                 }

                 .ik_widget_subscribe {}
                 .ik_widget_subscribe h5 {
                     margin-bottom: 10px;
                     color: #fff;
                 }
                 .ik_widget_subscribe p {
                    font-size: 12px;
                    color: #8e8e93;
                 }
                 .ik_widget_subscribe {}
            `}</style>
        </>
    )
}
