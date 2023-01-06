import { NextPage } from "next";
import axios from "axios";
import Editor, { FinalPost } from "../../../components/editor";
import AdminLayout from "../../../components/layout/AdminLayout";

interface Props {}

const create: NextPage<Props> = (props) => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      // generate formData
      const formData = new FormData();
      for (let key in post) {
        const value = (post as any)[key];
        if (key === "tags" && value.trim()) {
          const tags = value.split(" ").map((x: string) => x.trim());
          formData.append("tags", JSON.stringify(tags));
        } else formData.append(key, value);
      }
      // submit our post
      const { data } = await axios.post("/api/posts", formData);
      console.log(data);
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
