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
                /* a {
                    text-decoration: none;
                }


                .ik_nav_primary {
                    width: 100%;
                    height: 50px;
                    border-bottom: 1px solid rgb(242, 242, 247);
                }
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