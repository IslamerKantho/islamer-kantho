import Cors from "cors";
import { getAllPosts } from "./api";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  const { page, limit } = await req.query;

  const lowerLimit = await ((page - 1) * limit);
  const upperLimit = await (page * limit);

  console.log(req.query);
  // Run the middleware
  await runMiddleware(req, res, cors);
  const response = await getAllPosts(false, [lowerLimit, upperLimit]);

  // Rest of the API logic
  res.status(200).json(response);
}
