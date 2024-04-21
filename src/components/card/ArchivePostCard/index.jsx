import FormatterDate from "@/components/FormatterDate"
import { imageBuilder } from "@/pages/api/sanity"
import { truncate } from "@/utils/string.utils"
import { Box, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"

const ArchivePostCard = ({ article }) => {
    return (
        <Box
            className="w-full"
            component="article"
            key={article.slug}
        >
            <Box className="no-underline" href={`/article/${article.slug}`} component={Link}>
                <Box className="w-full flex justify-center items-center rounded-lg overflow-hidden">
                    {article.coverImage && (
                        <Image
                            src={imageBuilder(article?.coverImage)
                                .width(286)
                                .height(161)
                                .url()}
                            width={286}
                            height={161}
                            alt={article.title}
                            placeholder="blur"
                            blurDataURL={imageBuilder(article?.coverImage)
                                .width(286)
                                .height(161)
                                .url()}
                        />
                    )}
                </Box>

                <Box className="md:min-h-[122px] px-5" >
                    <Box className="mt-4 flex items-center flex-start flex-row">
                        <Typography
                            className="pe-1 text-black hover:opacity-75 text-[11px] font-bold leading-4 no-underline"
                            href={`/category/${article?.category?.slug}`} 
                            component={Link}
                            passHref
                        >
                            {article?.category?.title} 
                        </Typography>
                        <Typography
                            className="ps-1 border-s ms-0 text-[#666] text-[11px] font-bold leading-4 no-underline uppercase"
                            component="p"
                        >
                            <FormatterDate dateString={article?.date?.updatedAt || article?.date?.createdAt} />
                        </Typography>
                    </Box>

                    <Typography
                        className="mt-2.5 mb-0 text-[#055547] text-lg font-bold hover:opacity-75"
                        variant="h3"
                        title={article.title}
                    >
                        {truncate(article.title, 50)}
                    </Typography>

                    <Typography
                        className="my-2 text-[#666] text-xs leading-[160%] [line-break:anywhere]"
                        paragraph
                    >
                        {truncate(article?.excerpt)}
                    </Typography>

                    <Typography
                            className=" pe-1 text-[#666] hover:opacity-75 text-[11px] font-bold leading-4 no-underline"
                            href={`/writer/${article?.writer?.slug}`} 
                            component={Link}
                            passHref
                        >
                            {article?.author?.name} 
                        </Typography>
                </Box>
            </Box>
        </Box >
    )
}

export default memo(ArchivePostCard)