import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";

export const Sidebar = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Produtos",
    path: "/produtos",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/login",
    icon: <FiIcons.FiLogOut />,
    cName: "nav-text",
  },
];
