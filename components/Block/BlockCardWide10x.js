import CardFullWide from "../card/CardFullWide"


export default function BlockCardWide10x({ postData }) {
    return (
        <>
            <section className="ik_recent_articles">
                <div className="ik__header">
                    <h3 className="ik_title">সাম্প্রতিক লেখাসমুহ</h3>
                </div>

                <div className="ik__body">
                    { postData && postData.map( post => (
                        <CardFullWide key={post._id} postData={post} />
                    ))}
                </div>
            </section>
        </>
    )
}