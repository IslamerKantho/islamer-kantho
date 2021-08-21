// Core Components
import Image from 'next/image'
// Custom Components
import Container from "../container";


export default function BlockBanner() {
    return (
        <>
            <section className="ik_mt-8">
                {/* <Container dataClasses="mx_auto"> */}
                    <Image src={`/img/banner.jpg`} width={1920} height={580} layout="responsive" alt="Islamer Kantho - Islamic hadith banner" />
                {/* </Container> */}
            </section>
        </>
    )
}