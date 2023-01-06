import { NextApiHandler } from "next";
import createPost from "../../../lib/api/posts/createPost";
import { readPosts } from "../../../lib/api/posts/readPosts";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      return readPosts(req, res);
    }
    case "POST": {
      return createPost(req, res);
    }
    default:
      break;
  }
};

export default handler;
