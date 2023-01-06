import { NextApiHandler } from "next";
import formidable from "formidable";
import Post from "../../../models/Post";
import cloudinary from "../../cloudinary";
import { readFile } from "../../utils/readFile";
import { IncomingPost } from "./createPost";
import { postValidationSchema, validateSchema } from "./validatePost";

const updatePost: NextApiHandler = async (req, res) => {
  const postId = req.query.postId as string;
  const post = await Post.findById(postId);

  if (!post) return res.status(404).json({ error: "Post not found!" });

  const { files, body } = await readFile<IncomingPost>(req);

  let tags = [];
  if (body.tags) tags = JSON.parse(body.tags as string);

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  //slug is bad idea to update, it is important meta data (crawlers, current views and visitors, etc...)
  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  //update thumbnail if there is any
  const thumbnail = files.thumbnail as formidable.File;
  if (thumbnail) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      thumbnail.filepath,
      {
        folder: "beer_blog",
      }
    );
    //removing the old thumbnail for the post
    const publicId = post.thumbnail?.public_id;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
    //updating the post with new thumbnail
    post.thumbnail = { url, public_id };
  }

  await post.save();

  res.json({ post });
};

export default updatePost;
