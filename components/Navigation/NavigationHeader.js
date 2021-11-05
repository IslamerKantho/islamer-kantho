import PrimaryNavigation from "./PrimaryNavigation";
import SeconderyNavigation from "./SeconderyNavigation";
import '../../styles/NavigationHeader.module.sass'
import { getCategoryList } from "../../pages/api/api";

export default function NavigationHeader({ categories, preview}) {
    // console.log('cat: ', categories)
    return (
        <>
            <header className="ik_nav_header ik_divide-solid">
                <PrimaryNavigation />
                <SeconderyNavigation data={categories, preview} />
            </header>

            <style jsx>{`
                .ik_nav_header {
                    background: #fff;
                }
            `}</style>
        </>
    )
}

export async function getStaticProps({ preview = false }) {
    
    const categories = await getCategoryList(preview)
  
    return {
      props: { categories, preview },
      revalidate: 1
    }
}