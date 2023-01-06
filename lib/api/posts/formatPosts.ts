import { PostDetails } from "../../../core/entities/post";
import { PostModelSchema } from "../../../models/Post";

const formatPosts = (posts: PostModelSchema[]): PostDetails[] => {
  return posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    meta: post.meta,
    tags: post?.tags,
    createdAt: post.createdAt.toString(),
    thumbnail: post?.thumbnail?.url || "",
  }));
};

export default formatPosts;
