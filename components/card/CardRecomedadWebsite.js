// Core Components
import Image from "next/image"
// Custom Components


export default function CardRecomentdadWebsite() {
    return (
        <>
            <div className="ik_recomendad_site_card">
                <div className="ik_logo ik_w-2/12">
                    <Image src={`/img/branding/favicon.png`} width={45} height={45} alt={`website name`} />
                </div>
                <div className="ik_body ik_w-9/12">
                    <h3 className="ik_font-bold ik_text-base ik_mb-0.5 ik_text-primary hover:ik_underline">Islamer Kantho</h3>
                    <p className="ik_font-normal ik_text-13 ik_leading-4 ik_text-dark-alpha">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
            </div>

            <style jsx>{`
                .ik_recomendad_site {
                    background: #fff;
                }
            `}</style>
        </>
    )
}