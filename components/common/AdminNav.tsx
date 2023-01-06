import Link from "next/link";
import React, { FC, useRef } from "react";
import Logo from "./Logo";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { IconType } from "react-icons";
import AdminNavItem from "./AdminNavItem";
import useNavVisibility from "../../core/hooks/useNavVisibility";

interface Props {
  navItems: { label: string; link: string; icon: IconType }[];
}

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const { visibility, toggleVisibility } = useNavVisibility();
  const [mounted, setMounted] = React.useState(false);
  const ref = useRef(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <nav
      ref={ref}
      className={[
        "h-screen shadow-sm bg-primaryBg text-onPrimary flex flex-col justify-between transition-width overflow-hidden sticky top-0",
        visibility ? "w-60" : "w-12",
      ].join(" ")}
    >
      <div>
        {/* logo */}
        <Link
          href={"/admin"}
          className="flex flex-row items-center space-x-2 p-3 mb-10"
        >
          <Logo className="fill-onNeutral w-8 h-8" />
          {visibility && (
            <span className="text-onNeutral font-semibold text-xl leading-none">
              Admin
            </span>
          )}
        </Link>
        {/* nav items */}
        <div className="space-y-6">
          {navItems.map((navItem) => (
            <AdminNavItem
              key={navItem.link}
              {...navItem}
              visible={visibility}
            />
          ))}
        </div>
      </div>
      {/* nav toggler (button) */}
      <button
        onClick={() => toggleVisibility(!visibility)}
        className="flex items-center ext-primaryBg text-xl p-3 hover:scale-[0.98] transition self-end mb-5"
      >
        {visibility ? (
          <RiMenuFoldLine size={25} />
        ) : (
          <RiMenuUnfoldLine size={25} />
        )}
      </button>
    </nav>
  ) : (
    <></>
  );
};

export default AdminNav;
