import { imageBuilder } from "../../pages/api/sanity";
import Image from 'next/image'


export default function ArticleCover({src}) {
    // console.group('ArticleCover')
    // console.log('src: ', src )
    // console.groupEnd()

    return (
        <>
            <Image src={imageBuilder(src).width(660).height(372).url()} width={660} height={372} layout="responsive" />
        </>
    )
}