import Link from 'next/link'


export default function PrimaryNavigation() {
    return (
        <>
            <nav className="ik_nav_primary">
                <div className="ik_container ik_p-3 ik_text-center">
                    <Link href={`/`} as={'/'}>
                        <a className="ik_text-3xl ik_font-bold ik_text-primary hover:ik_text-primary">
                            ইসলামের কন্ঠ
                        </a>
                    </Link>
                </div>
            </nav>

            <style jsx>{`

                .ik_nav_primary .ik_container {
                    padding: 8px 0;
                    text-align: center;
                }
                .ik_nav_primary .ik_container a {
                    font-size: 28px;
                    font-weight: 600;
                    color: #055547;
                }

                /*
                .ik_nav_primary .ik_container {
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    
                }
                
                .ik_nav_primary .ik_container .ik_nav_brand,
                .ik_nav_primary .ik_container .ik_nav_brand a {
                    color: #2A2A2A;
                    font-size: 22px;
                    font-weight: 600;
                } */
            `}</style>
        </>
    )
}