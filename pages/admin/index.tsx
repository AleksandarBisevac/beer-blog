import { NextPage } from "next";
import AdminLayout from "../../components/layout/AdminLayout";

interface Props {
  navVisibility: boolean;
}

const Admin: NextPage<Props> = (props) => {
  return (
    <AdminLayout>
      <div>This is admin</div>
    </AdminLayout>
  );
};

export default Admin;
