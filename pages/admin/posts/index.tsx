import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRef, useState } from "react";
import axios from "axios";
import PostCard from "../../../components/common/PostCard";
import AdminLayout from "../../../components/layout/AdminLayout";
import { PostDetails } from "../../../core/entities/post";
import formatPosts from "../../../lib/api/posts/formatPosts";
import { readPostsFromDb } from "../../../lib/api/posts/readPosts";
import useInfiniteScroll from "../../../core/hooks/useInfiniteScroll";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNumber = 0;
const limit = 10;

const Posts: NextPage<Props> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePost, setHasMorePosts] = useState(true);
  const postsLength = useRef(posts.length);

  const incrementPageNumber = (pgnumber: number) => {
    if (pgnumber * limit < postsLength.current) {
      pageNumber++;
      return true;
    }
    return false;
  };

  const fetchMorePosts = async () => {
    if (!incrementPageNumber(pageNumber)) return setHasMorePosts(false);

    const { data } = await axios(
      `/api/posts?limit=${limit}&pageNumber=${pageNumber}`
    );
    setPostsToRender((prev) => [...prev, ...data.posts]);
    postsLength.current += data.posts.length;
    if (data.posts.length < limit) {
      setHasMorePosts(false);
      return;
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll({
    fetchFunc: fetchMorePosts,
    shouldFetch: hasMorePost,
  });

  return (
    <AdminLayout title="Posts">
      <div className="mx-auto p-3 max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
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
