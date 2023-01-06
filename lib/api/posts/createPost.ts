import { NextApiHandler } from "next";
import formidable from "formidable";
import cloudinary from "../../cloudinary";
import dbConnect from "../../db-connection";
import { readFile } from "../../../lib/utils/readFile";
import Post from "../../../models/Post";
import { IncomingPost } from "../../../core/entities/post";
import {
  errorMessages,
  postValidationSchema,
  validateSchema,
} from "./validatePost";

const createPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile<IncomingPost>(req);
  const { title, content, slug, meta } = body;

  let tags = [];
  if (body.tags) {
    tags = JSON.parse(body.tags as string);
  }

  await dbConnect();
  const alreadyExists = await Post.findOne({ slug: body.slug });
  if (alreadyExists)
    return res.status(400).json({ error: errorMessages.SLUG_IS_NOT_UNIQUE });

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  // create new Post
  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  //uploading thumbnail if there is any
  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "beer_blog",
      }
    );

    newPost.thumbnail = { url, public_id };
  }

  await newPost.save();

  res.json({ post: newPost });
};

export default createPost;
