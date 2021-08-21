import client, { previewClient } from './sanity'

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

// API Client.
const getClient = (preview) => (preview ? previewClient : client)

const postFields = `
  _id,
  name,
  title,
  categories,
  'date': {
    'createdAt': _createdAt, 
  	'updatedAt': _updatedAt
  },
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`


// Featured Posts.
export async function getRecommendedPost(preview, range) {
  // Defining Data range.
  let dataRange = (n) => n?`[${n[0]}...${n[1]}]`:`[]`

  const dataQuery = `*[_type == "post" && recommended ] | order(publishedAt desc)`
  const dataParams = `
    _id,
    title,
    'slug': slug.current,
    excerpt,
    'coverImage': mainImage,
  `
  const featuredPost = await getClient(preview).fetch(
    `${dataQuery} {
      ${dataParams}
    } ${dataRange(range)}`
  )

  return getUniquePosts(featuredPost)
}


// Featured Posts.
export async function getFeaturedPost(preview, range) {
  // Defining Data range.
  let dataRange = (n) => n?`[${n[0]}...${n[1]}]`:`[]`

  const dataQuery = `*[_type == "post" && featured ] | order(publishedAt desc)`
  const dataParams = `
    _id,
    title,
    'slug': slug.current,
    excerpt,
    'coverImage': mainImage,
  `
  const featuredPost = await getClient(preview).fetch(
    `${dataQuery} {
      ${dataParams}
    } ${dataRange(range)}`
  )

  return getUniquePosts(featuredPost)
}


// Category List.
export async function getCategoryList() {
  const dataQuery = `*[_type='post'] | order(publishedAt desc)`
  const dataParams = `
    _id,
    title,
    'slug': slug.current,
    excerpt,
    'coverImage': mainImage,
  `
  const featuredPost = await getClient(false).fetch(
    `${dataQuery} {
      // ${dataParams}
    }`
  )

  return getUniquePosts(featuredPost)
}


export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}

export async function getAllPosts(preview, range) {
  let dataRange = (n) => n?`[${n[0]}...${n[1]}]`:`[]`

  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc){
      ${postFields}
    } ${dataRange(range)}`)

  return getUniquePosts(results)
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient.fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        body,
        'comments': *[
                      _type == "comment" && 
                      post._ref == ^._id && 
                      approved == true] {
          _id, 
          name, 
          email, 
          comment, 
          _createdAt
        }
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
        body,
      }[0...2]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}
