import { NextPage } from "next";
import Editor from "../../../components/editor";
import AdminLayout from "../../../components/layout/AdminLayout";

interface Props {}

const create: NextPage<Props> = (props) => {
  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor
          onSubmit={(post) => {
            console.log(post);
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default create;
