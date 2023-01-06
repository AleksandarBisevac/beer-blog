import { Schema, models, model, ObjectId, Model } from "mongoose";

// title, content, slug, tags, thumbnail, meta, author, date

interface PostModelSchema {
  title: string;
  slug: string;
  meta: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: ObjectId;
  tags: string[];
  thumbnail: { url: string; public_id: string };
}

const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    meta: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);

// we need this checkup because NextJS is pain in the a$$
const Post = models?.Post || model("Post", PostSchema);

export default Post as Model<PostModelSchema>;
