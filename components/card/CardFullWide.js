// API
import { imageBuilder } from "../../pages/api/sanity"
// Core Components
import Link from 'next/link'
import Image from 'next/image'
// Components
import { Row, Col, Divider, Tag, Typography } from "antd";
import Style from '../../styles/card/CardFullWide.module.sass'


export default function CardFullWide({ postData }) {
    // console.group('CardFullWide')
    // console.log('postData: ', postData)
    // console.log('Style: ', Style)
    // console.groupEnd()

    return (
        <>
            <article className="ik_card_full_card bg_white shadow">
                <Link as={`/article/${postData.slug}`} href={`/article/[slug]`}>
                    <a>
                        <div className="card_block">
                            <div className="img_wrapper w_1/4">
                                <Image src={imageBuilder(postData.coverImage).width(286).height(180).url()} width={286} height={180} layout="responsive" alt={postData.slug} />
                            </div>
                            
                            <div className="card_body w_3/4">
                                <Link href={`/category`}>
                                    <a className="category">হাদীস শরীফ</a>
                                </Link>
                                
                                <h3 className="title">{postData.title}</h3>
                                <p className="excerpt">{postData.excerpt}</p>
                                     
                            </div>
                        </div>
                    </a>
                </Link>
                
            </article>
        </>
    )
}