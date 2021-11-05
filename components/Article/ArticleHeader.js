import { Row, Col, Typography, Avatar } from "antd"
// import { Row, Col } from ''
import Text from "antd/lib/typography/Text"
import { imageBuilder } from "../../pages/api/sanity"
import Image from 'next/image'
import FormatterDate from "../FormatterDate"

export default function ArticleHeader({ title, date, author, excerpt, category }) {
    // console.group('ArticleHeader')
    // console.log('Title: ', title)
    // console.log('Date: ', date)
    // console.log('Author: ', author)
    // console.log('Category: ', category)
    // console.log('Excerpt: ', excerpt)
    // console.groupEnd()

    const { Title, Text, Paragraph } = Typography

    const style = {
        mainHeader: {
            fontSize: 34,
            lineHeight: '42px',
            fontWeight: 700,
            color: '#2A2A2A'
        },
        category: {
            fontSize: 12,
            lineHeight: '22px',
            marginBottom: 10
        },
        headerRow: {
            height: '100%'
        },
        avater: {
            marginRight: 12
        }
    }
    return (
        <>
            <div className="ik_article_header">
                <Row style={style.headerRow} justify="space-between" align="middle">
                    <Col>
                        <div className="ik_header_top_content">
                            <p style={style.category} className="ik_meta">হাদীস শরীফ {category?._ref}</p>
                            <Title style={style.mainHeader} lavel={1}>{title}</Title>
                            <Paragraph>{excerpt}</Paragraph>
                        </div>
                    </Col>

                    <Col>
                        <div className="ik_header_bottom_content">

                            <div className="__left">
                                <Avatar 
                                    src={author.picture}
                                    style={style.avater, { verticalAlign: 'middle' }} 
                                    size="96" 
                                    gap={20}
                                ></Avatar>
                            </div>

                            <div className="__right">
                                <Text>{author.name}</Text>
                                <FormatterDate dateString={date} />
                            </div>

                        </div>
                    </Col>
                </Row>
                
            </div>

            <style jsx>{`
                .ik_article_header {
                    height: 100%;
                }

                .ik_header_bottom_content {
                    display: flex;
                    flex-direction: row;
                }
                .__left {}
                .__right {
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </>
    )
}