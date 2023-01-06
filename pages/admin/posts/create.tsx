import { NextPage } from "next";
import axios from "axios";
import Editor, { FinalPost } from "../../../components/editor";
import AdminLayout from "../../../components/layout/AdminLayout";
import generateFormData from "../../../lib/utils/generateFormData";
import formatTagsToApi from "../../../lib/pages/posts/formatTagsToApi";

interface Props {}

const create: NextPage<Props> = (props) => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      const formData = generateFormData(post, {
        tags: formatTagsToApi,
      });

      // submit our post
      const { data } = await axios.post("/api/posts", formData);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default create;
