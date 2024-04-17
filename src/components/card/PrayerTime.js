// API


export default function PrayerTime() {
    return (
        <>
        </>
    )
}


export async function getStaticProps() {
    const prams = {
        place: {
            lon: 91.880722,
            lat: 24.886436
        },
        date: {
            month: 8,
            year: 2021
        }
    }
    const url = `https://api.aladhan.com/v1/calendar?latitude=${prams.place.lat}&longitude=${prams.place.lon}&method=2&month=${place.date.month}&year=${place.date.year}`
}