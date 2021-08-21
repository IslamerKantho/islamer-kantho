import Head from 'next/head'
import BlockGridPostCard from '../../components/Block/BlockGridPostCard'
import { getAllPosts } from '../../lib/api'
import Layout from '../../components/layout'


export default function PageArticles({ allPosts, preview }) {
    // console.group('Articles Page')
    // console.log('Articles: ', allPosts)
    // console.groupEnd()

    // Router

    return (
        <>
            <Head>
                <title>আরটিকেল | ইসলামের কন্ঠ</title>
            </Head>
            
            <Layout preview={preview}>
                <BlockGridPostCard key={allPosts._id} postData={allPosts} />
            </Layout>
        </>
    )
}

export async function getStaticProps({ preview = false }) {
    const allPostRange = [0,12]  // Recent Article Range
    const allPosts = await getAllPosts(preview, allPostRange)
    return {
        props: { allPosts, preview },
        revalidate: 1
    }
}
