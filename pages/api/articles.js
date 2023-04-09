import { getAllPosts } from "./api";

const MAX_POSTS = 10;
const MIN_POSTS = 0;

export default async function handler(req, res) {
  let { offset, limit, category } = await req.query;

  // When offset value less than 0, set it to 0.
  if ( !offset || offset < 0 ) offset = MIN_POSTS;

  // When limit is less than minimum valid limit or exceed a maximum valid limit, set it to 10.
  if ( !limit || limit <= MIN_POSTS || limit >  MAX_POSTS ) limit = MAX_POSTS;

  return getAllPosts(false, offset, limit, category).then((response) => {
    return res.status(200).json(response);
  });
}
