import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model = [
    {
      label: "Home",
      items: [
        { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
        {
          label: "Menu",
          icon: "pi pi-fw pi-id-card",
          to: "/menu",
        },
      ],
    },
    {
      label: "Form",
      items: [
        {
          label: "Products",
          icon: "pi pi-fw pi-id-card",
          to: "/product",
        },
        {
          label: "Users",
          icon: "pi pi-fw pi-users",
          to: "/user",
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
