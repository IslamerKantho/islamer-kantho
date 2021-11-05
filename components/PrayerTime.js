import React from 'react'

const PrayerTime = () => {
    return (
        <div className="ik_prayer_time">
            <div className="ik__header">
                <h4 className="ik_title">নামাজের সময়সূচি </h4>
            </div>
            <iframe style={{ width: '100%', height: '358px', border: '1px solid #ddd'}} scrolling="no" src="https://www.islamicfinder.org/prayer-widget/1185099/shafi/5/0/18/18"> </iframe>
        </div>
    )
}

export default PrayerTime
