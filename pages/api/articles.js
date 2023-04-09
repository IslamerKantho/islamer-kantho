import Cors from "cors";
import { getAllPosts } from "./api";

const MAX_POSTS = 10;
const MIN_POSTS = 0;

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
// const cors = Cors({
//   methods: ["POST"],
// });

export default async function handler(req, res) {
  let { offset, limit, category } = await req.query;

  // When offset value less than 0, set it to 0.
  if ( !offset || offset < 0 ) offset = 0;

  // When limit is less than minimum valid limit or exceed a maximum valid limit, set it to 10.
  if ( !limit || limit <= MIN_POSTS || limit >  MAX_POSTS ) limit = MAX_POSTS;

  console.log("PARAMS: ", req.query);

  return getAllPosts(false, offset, limit, category).then((response) => {
    return res.status(200).json(response);
  });
}
