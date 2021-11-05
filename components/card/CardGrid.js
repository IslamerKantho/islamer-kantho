// API
import { imageBuilder } from '../../pages/api/sanity'
// Components
import Link from 'next/link'
import Image from 'next/image'


export default function CardGrid({ cardData }) {
    const article = cardData;

    return (
        <>
            <article className="post_grid_card" key={article.slug}>
                <Link as={`/article/${article.slug}`} href="/article/[slug]">
                    <a className="">
                        <div className="post_block">
                            <div className="img ik_rounded-md">
                                {/* <Image src={imageBuilder(article.coverImage).width(286).height(161).url()} width={286} height={161} layout="responsive" alt={article.slug} /> */}
                                { article.coverImage && (
                                    <Image src={ imageBuilder(article?.coverImage).width(286).height(161).url() } width={286} height={161} layout="responsive" alt={article.slug} placeholder="blur" blurDataURL={ imageBuilder(article?.coverImage).width(286).height(161).url() } />
                                )}
                                
                            </div>
                            <div className="card_body ik_p-5 ik_flex ik_flex-col ik_justify-between">
                                <div className="">
                                    {/* Meta */}
                                    <p className="writer">
                                        হাফিজ মাওলানা মাহমুদুর রহমান
                                    </p>

                                    {/* Title */}
                                    <h3 className="title">{article.title}</h3>

                                    {/* Excerpt */}
                                    <p className="excerpt ik_font-normal ik_text-13 ik_mb-3 ik_text-dark-alpha ik_leading-1.35">{article.excerpt}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </article>
        </>
    )
}