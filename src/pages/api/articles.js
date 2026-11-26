import { getAllPosts } from "@/services/sanity.service";

const MAX_POSTS = 24;
const MIN_POSTS = 0;

export default async function handler(req, res) {
  let { offset, limit, category } = req.query;

  // When offset value less than 0, set it to 0.
  if (!offset || Number(offset) < 0) offset = MIN_POSTS;

  // When limit is less than minimum valid limit or exceeds maximum valid limit, default to 12.
  if (!limit || Number(limit) <= MIN_POSTS || Number(limit) > MAX_POSTS) {
    limit = 12;
  }

  const response = await getAllPosts(false, offset, limit, category);
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300"
  );
  return res.status(200).json(response);
}
