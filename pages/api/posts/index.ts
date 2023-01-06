import { NextApiHandler } from "next";
import createPost from "../../../lib/api/posts/createPost";
import dbConnect from "../../../lib/db-connection";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET": {
      await dbConnect();
      return res.json({ ok: true });
    }
    case "POST": {
      return createPost(req, res);
    }
    default:
      break;
  }
};

export default handler;
