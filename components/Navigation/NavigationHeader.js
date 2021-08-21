import PrimaryNavigation from "./PrimaryNavigation";
import SeconderyNavigation from "./SeconderyNavigation";
import '../../styles/NavigationHeader.module.sass'

export default function NavigationHeader() {
    return (
        <>
            <header className="ik_nav_header ik_divide-solid">
                <PrimaryNavigation />
                <SeconderyNavigation />
            </header>

            <style jsx>{`
                .ik_nav_header {
                    background: #fff;
                }
            `}</style>
        </>
    )
}