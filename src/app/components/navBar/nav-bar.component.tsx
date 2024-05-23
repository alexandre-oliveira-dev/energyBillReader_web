"use client";

import React, {useEffect, useState} from "react";
import {MenuProps} from "antd";
import {Menu} from "antd";
import {BsHouse} from "react-icons/bs";
import {BiMenu, BiUser} from "react-icons/bi";
import {IoLibrary} from "react-icons/io5";
import {PiSignOutLight} from "react-icons/pi";
import {signOut} from "firebase/auth";
import {auth, useAuth} from "@/service/useAuth";
import "./style.css";
import {MdDashboard} from "react-icons/md";

type MenuItem = Required<MenuProps>["items"][number];

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [itemSelected, setItemSelected] = useState<React.Key>();
  const {user} = useAuth();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items: MenuItem[] = [
    {
      key: "useremail",
      className: "userEmail",
      label: `Olá ${user?.email}`,
      icon: <BiUser size={20} />,
    },
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
      key: "charts",
      icon: <MdDashboard color="#fff" size={20} />,
      label: "Dashboard",
      onClick: () => (window.location.href = "/charts"),
      style: {marginTop: "2rem", fontSize: 18},
    },
    {
      key: "Sair",
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

  useEffect(() => {
    const pathName = window?.location.pathname.split("/")[1];
    setItemSelected(items[items.findIndex(i => i?.key === pathName)]?.key);
  }, [itemSelected, items]);

  return (
    <div
      style={{
        width: "auto",
        height: "100%",
        display: "flex",
      }}
    >
      {itemSelected && (
        <Menu
          className="navbar"
          style={{
            height: "100vh",
            position: "relative",
            zIndex: 1000,
          }}
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
