"use client";
import { useEffect, useState } from "react";
import "./sidebar.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Link from "next/link";

import { IoHome } from "react-icons/io5";
import { RiUserCommunityFill } from "react-icons/ri";
import { BsFilePost } from "react-icons/bs";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setOpenSidebar(false);
    }
  }, []);
  const handleClick = (itemKey: any) => {
    setSelected(itemKey);
  };
  type SidebarItem = {
    label: string;
    path: string;
    icon: React.ReactNode;
  };
  const menuItems = [
    {
      key: "dashboard",
      label: "Home",
      icon: <IoHome />,
      path: "/user",
    },

    {
      key: "communities",
      label: "Communities",
      icon: <RiUserCommunityFill />,
      path: "/user/communities",
    },
    {
      key: "posts",
      label: "Posts",
      icon: <BsFilePost />,
      path: "/user/posts",
    },
  ];
  return (
    <>
      <div className="sidebarToggleMenu">
        <button
          className="toggleMenuButton"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <FaArrowRightArrowLeft />
        </button>
      </div>
      <aside className={`sidebar ${!openSidebar ? "closeSidebar" : ""}`}>
        <ul className="sidebarMenuListContainer">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleClick(item.key)}
              className={selected === item.key ? "active" : ""}
              // onClickCapture={() => {
              //   if (item.function === "logout") {
              //     logout();
              //   }
              // }}
            >
              <Link href={item.path!} style={{ color: "white" }}>
                <span
                  className="text-(--text-secondary) hover:text-(--text-primary)"
                  style={{ marginRight: "8px" }}
                >
                  {item.icon}
                </span>
                <span className="text-(--text-secondary) hover:text-(--text-primary)">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
