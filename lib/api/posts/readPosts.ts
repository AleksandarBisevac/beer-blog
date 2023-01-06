import { NextApiHandler } from "next";
import Post from "../../../models/Post";
import dbConnect from "../../db-connection";
import formatPosts from "./formatPosts";

export const readPostsFromDb = async (limit: number, pageNumber: number) => {
  if (!limit || limit > 10)
    throw Error("Please use limit under 10 and a valid pageNumber");
  const skip = limit * pageNumber;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(skip)
    .limit(limit);

  return posts;
};
export const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNumber } = req.query as {
      limit: string;
      pageNumber: string;
    };

    const posts = await readPostsFromDb(+limit, +pageNumber);
    const formattedPosts = formatPosts(posts);

    res.json({ posts: formattedPosts });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
