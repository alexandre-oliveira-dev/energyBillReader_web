"use client";

import React, {useState} from "react";
import type {MenuProps} from "antd";
import {Menu} from "antd";
import {BsHouse} from "react-icons/bs";
import {BiMenu} from "react-icons/bi";

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
      style: {display: "grid", placeContent: "center"},
    },
    {
      key: "2",
      icon: <BsHouse color="#fff" size={20} />,
      label: "Inicio",
      onClick: () => (window.location.href = "/dashboard"),
      style: {marginTop: "2rem"},
    },
  ];

  return (
    <div style={{width: 256, height: "100%", display: "flex"}}>
      <Menu
        style={{height: "100vh"}}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
}
