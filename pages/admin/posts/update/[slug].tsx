import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import axios from "axios";
import Editor, { FinalPost } from "../../../../components/editor";
import AdminLayout from "../../../../components/layout/AdminLayout";
import dbConnect from "../../../../lib/db-connection";
import formatTagsToApi from "../../../../lib/pages/posts/formatTagsToApi";
import generateFormData from "../../../../lib/utils/generateFormData";
import Post from "../../../../models/Post";

interface PostResponse extends FinalPost {
  id: string;
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const UpdatePost: NextPage<Props> = ({ post }): JSX.Element => {
  const handleUpdate = async (post: FinalPost) => {
    try {
      const formData = generateFormData(post, {
        tags: formatTagsToApi,
      });

      // submit our post
      const { data } = await axios.patch("/api/posts/" + post.id, formData);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <AdminLayout title="Update post">
      <div className="max-w-4xl mx-auto">
        <Editor initialValue={post} onSubmit={handleUpdate} btnTitle="Update" />
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  try {
    const slug = context.query.slug as string;
    await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) return { notFound: true };

    const { _id, meta, title, content, thumbnail, tags } = post;

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          thumbnail: thumbnail?.url || "",
          tags: tags.join(" "),
          slug: post.slug,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default UpdatePost;
