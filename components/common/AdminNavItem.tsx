import Link from "next/link";
import React, { FC } from "react";
import { IconType } from "react-icons";

interface Props {
  link: string;
  label: string;
  visible: boolean;
  icon?: IconType;
}

const AdminNavItem: FC<Props> = ({
  label,
  link,
  visible,
  icon,
}): JSX.Element => {
  return (
    <Link key={link} href={link} className="flex flex-1 ext-primaryBg">
      <div className="flex items-center ext-primaryBg text-xl p-3 hover:scale-[0.98] transition">
        {icon && React.createElement(icon, { size: 24 })}
        {visible && <span className="ml-2 leading-none">{label}</span>}
      </div>
    </Link>
  );
};

export default AdminNavItem;
