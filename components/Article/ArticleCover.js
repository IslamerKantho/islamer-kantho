import Image from 'next/image'
import { imageBuilder } from "../../pages/api/sanity"


export default function ArticleCover({src}) {
    // console.group('ArticleCover')
    // console.log('src: ', src )
    // console.groupEnd()

    return (
        <>
            <div className="ik_single_cover">
                <Image src={imageBuilder(src).width(660).height(372).url()} width={660} height={372} />
            </div>
            
            <style jsx>{`
                .ik_single_cover {
                    width: 100%;
                    height: auto;
                }
            `}</style>
        </>
    )
}