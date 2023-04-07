import client, { previewClient } from "./sanity";

// Initialization
const MAX_POSTS = 10;
const MIN_POSTS = 0;

const getUniquePosts = (posts) => {
  const slugs = new Set();
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false;
    } else {
      slugs.add(post.slug);
      return true;
    }
  });
};

// API Client.
const getClient = (preview) => (preview ? previewClient : client);

const postFields = `
  _id,
  name,
  title,
  'category': categories[]-> {
    title,
    'slug': slug.current
  },
  'date': {
    'createdAt': _createdAt, 
  	'updatedAt': _updatedAt
  },
  excerpt,
  'slug': slug.current,
  'coverImage': mainImage,
  'author': author->{name, 'picture': image.asset->url},
`;

// Recommended Posts.
export async function getRecommendedPost(preview, range) {
  // Defining Data range.
  let dataRange = (n) => (n ? `[${n[0]}...${n[1]}]` : `[]`);

  const dataQuery = `*[_type == "post" && recommended ] | order(publishedAt desc)`;
  const dataParams = `
    _id,
    'date': {
      'createdAt': _createdAt, 
      'updatedAt': _updatedAt
    },
    'category': categories[0]-> {
      title,
      'slug': slug.current
    },
    'author': author->{name, 'picture': image.asset->url},
    title,
    'slug': slug.current,
    excerpt,
    'coverImage': mainImage,
  `;
  const featuredPost = await getClient(preview).fetch(
    `${dataQuery} {
      ${dataParams}
    } ${dataRange(range)}`
  );

  return getUniquePosts(featuredPost);
}

// Featured Posts.
export async function getFeaturedPost(preview, range) {
  // Defining Data range.
  let dataRange = (n) => (n ? `[${n[0]}...${n[1]}]` : `[]`);

  const dataQuery = `*[_type == "post" && featured ] | order(publishedAt desc)`;
  const dataParams = `
    _id,
    title,
    'date': {
      'createdAt': _createdAt, 
      'updatedAt': _updatedAt
    },
    'category': categories[0]-> {
      title,
      'slug': slug.current
    },
    'author': author->{name, 'picture': image.asset->url},
    
    'slug': slug.current,
    excerpt,
    'coverImage': mainImage,
  `;
  const featuredPost = await getClient(preview).fetch(
    `${dataQuery} {
      ${dataParams}
    } ${dataRange(range)}`
  );

  return getUniquePosts(featuredPost);
}

// Category List.
export async function getCategoryList(preview) {
  const dataQuery = `*[_type=='category'] | order(publishedAt desc)`;
  const dataParams = `
    _id,
    title
  `;
  const featuredPost = await getClient(preview).fetch(
    `${dataQuery} {
      // ${dataParams}
    }`
  );

  return getUniquePosts(featuredPost);
}

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      body
    }`,
    { slug }
  );
  return data[0];
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
  return data;
}

/**
 * Get all posts.
 *
 * @param {boolean} preview
 * @param {number} offset
 * @param {number} limit
 * @returns
 */
export async function getAllPosts(preview = false, offset, limit) {
  let totalPosts = 0;
  let offsetValue = parseInt(offset);
  let limitValue = parseInt(limit);

  // When offset value less than 0, set it to 0.
  if (!offsetValue ||  offsetValue < MIN_POSTS ) offsetValue = MIN_POSTS;

  // When limit is less than minimum valid limit or exceed a maximum valid limit, set it to 10.
  if (!limitValue ||  limitValue <= MIN_POSTS || limitValue >  MAX_POSTS ) limitValue = MAX_POSTS;

  // Defining Data range.
  const range = `[${offsetValue}...${offsetValue + limitValue + 1}]`;

  const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      name,
      title,
      'category': categories[0]-> {
        title,
        'slug': slug.current
      },
      'date': {
        'createdAt': _createdAt, 
        'updatedAt': _updatedAt
      },
      excerpt,
      'slug': slug.current,
      'coverImage': mainImage,
      'author': author->{_id, name, 'picture': image.asset->url},
    } ${range}`;
  const results = await getClient(preview).fetch(query);

  // Get total posts.
  totalPosts = await results.length;

  // Remove extra post from the result. Which used for pagination.
  await results.splice(limitValue);

  // Check if there are more posts to fetch.
  const isPaginate = totalPosts > limitValue;

  return { data: getUniquePosts(results), isPaginate, offset: offsetValue + limitValue, length: results.length };
}

/**
 *
 * @param {boolean} preview
 * @param {array} range
 * @returns
 */
export async function getAllPostsByCategory(preview, category, range) {
  let dataRange = (n) => (n ? `[${n[0]}...${n[1]}]` : `[]`);
  let filter = `_type == "post" && "${category}" in (categories[]->slug.current)`;
  const query = `{
    "data": *[${filter}] | order(publishedAt desc){
      ${postFields}
    } ${dataRange(range)},
   "length": count(*[${filter}])
   }`;

  const results = await getClient(preview).fetch(query);

  return { length: results.length, data: getUniquePosts(results.data) };
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
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
  ]);
  return { post, morePosts: getUniquePosts(morePosts) };
}
