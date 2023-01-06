import React, { FC } from "react";
import {
  MdSpaceDashboard,
  MdPeople,
  MdMail,
  MdPermContactCalendar,
} from "react-icons/md";
import { AiFillContainer, AiOutlineFileAdd } from "react-icons/ai";
import AdminNav from "../common/AdminNav";
import Link from "next/link";
import AppHead from "../common/AppHead";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const navItems = [
  { link: "/admin", icon: MdSpaceDashboard, label: "Dashboard" },
  { link: "/admin/posts", icon: AiFillContainer, label: "Posts" },
  { link: "/admin/users", icon: MdPeople, label: "Users" },
  { link: "/admin/comments", icon: MdMail, label: "Comments" },
  { link: "/admin/contact", icon: MdPermContactCalendar, label: "Contacts" },
];

const AdminLayout: FC<Props> = ({ children, title }): JSX.Element => {
  return (
    <>
      <AppHead title={title} />
      <div className="flex">
        <AdminNav navItems={navItems} />
        <div className="flex-1 p-4">{children}</div>
        <Link
          href="/admin/posts/create"
          className="bg-primaryBg text-onPrimaryBg rounded-full fixed z-10 right-10 bottom-10 p-3 hover:scale-90 transition shadow-md"
        >
          <AiOutlineFileAdd size={24} />
        </Link>
      </div>
    </>
  );
};

export default AdminLayout;
