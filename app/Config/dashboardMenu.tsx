import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { CiSettings, CiLogout } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { AiOutlineApi } from "react-icons/ai";
export const adminMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  { key: "users", label: "Users", icon: <FaUsers />, path: "/admin/users" },
  {
    key: "owners",
    label: "Owners",
    icon: <HiOutlineUsers />,
    path: "/admin/owners",
  },
  {
    key: "apis",
    label: "APIs",
    icon: <AiOutlineApi />,
    path: "/admin/apis",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <CiSettings />,
    path: "/admin/settings",
  },
  {
    key: "logout",
    label: "Logout",
    className: "logout",
    function: "logout",
    icon: <CiLogout style={{ color: "red" }} />,
  },
];

export const consumerMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  {
    key: "profile",
    label: "Profile",
    icon: <ImProfile />,
    path: "/consumer/profile",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <CiSettings />,
    path: "/consumer/settings",
  },
  {
    key: "logout",
    label: "Logout",
    className: "logout",
    function: "logout",
    icon: <CiLogout style={{ color: "red" }} />,
  },
];

export const ownerMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
  },
  { key: "users", label: "Users", icon: <FaUsers />, path: "/owner/users" },
  {
    key: "apis",
    label: "APIs",
    icon: <AiOutlineApi />,
    path: "/owner/apis",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <CiSettings />,
    path: "/owner/settings",
  },
  {
    key: "logout",
    label: "Logout",
    className: "logout",
    function: "logout",
    icon: <CiLogout style={{ color: "red" }} />,
  },
];
