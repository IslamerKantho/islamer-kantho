import React from 'react'

const HijriCalender = () => {
    return (
        <>
            <div className="ik_prayer_time">
                <div className="ik__header">
                    <h4 className="ik_title">হিজরি ক্যালেন্ডার </h4>
                </div>
                <iframe style={{ width: '100%', height: '312px', border: '1px solid #ddd'}} scrolling="no" src="https://www.islamicfinder.org/islamic-calendar/widgetGregorian?type=Hijri"> </iframe>
            </div>

            <style jsx>{`
                .ik_prayer_time {
                    margin-top: 35px;
                }
            `}</style>
        </>
    )
}

export default HijriCalender
