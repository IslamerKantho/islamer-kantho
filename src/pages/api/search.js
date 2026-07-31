import { searchPosts } from "./api";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({ data: [] });
    }

    const results = await searchPosts(q);
    return res.status(200).json({ data: results });
  } catch (error) {
    console.error("Search API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
