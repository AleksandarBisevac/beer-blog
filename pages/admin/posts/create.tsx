import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Editor, { FinalPost } from "../../../components/editor";
import AdminLayout from "../../../components/layout/AdminLayout";
import generateFormData from "../../../lib/utils/generateFormData";
import formatTagsToApi from "../../../lib/pages/posts/formatTagsToApi";

interface Props {}

const Create: NextPage<Props> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (post: FinalPost) => {
    setLoading(true);
    try {
      const formData = generateFormData(post, {
        tags: formatTagsToApi,
      });

      // submit our post
      const { data } = await axios.post("/api/posts", formData);
      setLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
    }
  };
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={handleSubmit} busy={loading} />
      </div>
    </AdminLayout>
  );
};

export default Create;
