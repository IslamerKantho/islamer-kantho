// Components
import { Divider} from 'antd'
// Custom Components 
import Container from '../container'
import CardGrid from '../card/CardGrid'


export default function BlockGridPostCard({postData, sectionTitle}) {
    const allPosts = postData;

    return (
        <>
            <section className="ik_recomendetion">
                <Container dataClasses="mx_auto">
                    <div className="ik__header">
                        {sectionTitle && (
                            <h4 className="ik_title">{sectionTitle.text}</h4>
                        )}
                    </div>
                        
                    <div className="ik__body ">
                        {allPosts && allPosts.map( article => (
                            <CardGrid key={article._id} cardData={article} />
                        ))}
                    </div>

                </Container>
            </section>

            <style jsx>{`
                @media ( max-width: 767px ) {
                    .ik_recomendetion {
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                }
            `}</style>
        </>
    )
}