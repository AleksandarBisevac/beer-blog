import { NextApiHandler } from "next";
import updatePost from "../../../lib/api/posts/updatePost";

// api/posts/post-1 => update, delete
// api/posts/post-2
// api/posts/post-3

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    // patch | post
    case "PATCH":
      return updatePost(req, res);

    default:
      return res.status(404).send("Not Found!");
  }
};

export default handler;
