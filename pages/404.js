// import '../styles/error404.sass'
import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import NavigationHeader from '../components/Navigation/NavigationHeader'


const error404 = () => {
    return (
        <>
            <Head>
                <title>404 | ইসলামের কন্ঠ</title>0
            </Head>

            <Layout>

                <section id="notfound">
                    <div className="notfound">
                        <div>
                            <div className="notfound-404">
                                <h1>!</h1>
                            </div>
                            <h2>দুঃখিত! 404</h2>
                            <p>
                                আপনি যে পৃষ্টার অনুসন্ধান করতেছেন তা খোজে পাওয়া যায়নি। অনুগ্রহ করে লিংক সঠিক কি/না তা যাচাই করুন। অথবা
                                <Link href={'/'}>
                                    <a>
                                        মূল পাতায় ফিরে যান
                                    </a>
                                </Link>
                            </p>
                        </div>
                        
                    </div>
                </section>
            </Layout>
        </>
    )
}


export default error404;