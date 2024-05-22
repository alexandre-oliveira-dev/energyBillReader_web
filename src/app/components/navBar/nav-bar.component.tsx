"use client";

import React, {useState} from "react";
import type {MenuProps} from "antd";
import {Menu} from "antd";
import {BsHouse} from "react-icons/bs";
import {BiMenu} from "react-icons/bi";
import {IoLibrary} from "react-icons/io5";
import {PiSignOutLight} from "react-icons/pi";
import {signOut} from "firebase/auth";
import {auth} from "@/service/useAuth";
import "./style.css";

type MenuItem = Required<MenuProps>["items"][number];

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    {
      key: "1",
      onClick: toggleCollapsed,
      icon: <BiMenu size={30} />,
      className: "removeHover",
      style: {display: "grid", placeContent: "center"},
    },
    {
      key: "dashboard",
      icon: <BsHouse color="#fff" size={20} />,
      label: "Inicio",
      onClick: () => (window.location.href = "/dashboard"),
      style: {marginTop: "2rem", fontSize: 18},
    },
    {
      key: "libInvoices",
      icon: <IoLibrary color="#fff" size={20} />,
      label: "Biblioteca de faturas",
      onClick: () => (window.location.href = "/libInvoices"),
      style: {marginTop: "2rem", fontSize: 18},
    },
    {
      key: "4",
      icon: <PiSignOutLight color="#fff" size={20} />,
      label: "Sair",
      onClick: async () =>
        await signOut(auth).then(() => (window.location.href = "/")),
      style: {
        width: "min-content",
        marginTop: "2rem",
        fontSize: 18,
        position: "absolute",
        bottom: "30px",
      },
    },
  ];

  console.log(window.location.pathname);

  const pathName = window.location.pathname.split("/")[1];
  const itemSelected = items[items.findIndex(i => i?.key === pathName)]?.key;
  console.log("🚀 ~ NavBar ~ itemSelected:", itemSelected);

  return (
    <div style={{width: 256, height: "100%", display: "flex"}}>
      {pathName && (
        <Menu
          style={{height: "100vh", position: "relative"}}
          defaultSelectedKeys={[String(itemSelected)]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      )}
    </div>
  );
}
