// Core Components
// Custom Components
import CardRecomentdadWebsite from "../card/CardRecomedadWebsite"
import HijriCalender from "../HijriCalender"
import PrayerTime from "../PrayerTime"


export default function BlockSidebar() {
    return (
        <>
            <aside>
                {/* Prayer Time */}
                <PrayerTime/>

                {/* Hijro Calender */}
                <HijriCalender/>

                {/* <div className="ik_aside_recomendad">
                    <div className="ik__header">
                        <h4 className="ik_title">Recomendad websites</h4>
                    </div>
                    <CardRecomentdadWebsite />
                    <CardRecomentdadWebsite />
                    <CardRecomentdadWebsite />
                </div> */}
            </aside>
        </>
    )
}