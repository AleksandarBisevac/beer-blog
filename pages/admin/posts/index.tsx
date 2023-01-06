import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState } from "react";
import PostCard from "../../../components/common/PostCard";
import AdminLayout from "../../../components/layout/AdminLayout";
import { PostDetails } from "../../../core/entities/post";
import formatPosts from "../../../lib/api/posts/formatPosts";
import { readPostsFromDb } from "../../../lib/api/posts/readPosts";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNumber = 0;
const limit = 10;

const Posts: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  return (
    <AdminLayout title="Posts">
      <div className="mx-auto p-3 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {postsToRender.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
interface ServerSideResponse {
  posts: PostDetails[];
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  try {
    //read posts
    const posts = await readPostsFromDb(limit, pageNumber);
    //format posts
    const formattedPosts = formatPosts(posts);
    return { props: { posts: formattedPosts } };
  } catch (error) {
    return { notFound: true };
  }
};

export default Posts;
