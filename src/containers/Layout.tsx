import React from "react";
import RestoreIcon from "@material-ui/icons/Restore";
import { LocalBar, Restaurant, Payment } from "@material-ui/icons";

import ResponsiveDrawer from "../components/Drawer";
import SimpleBottomNavigation from "../components/BottomNav";

export default (props: {
  drawerItems: {
    label: string;
    key: string;
  }[][];
  children: React.ReactNode | React.ReactNode[];
}) => {
  const bottomNavItems = [
    {
      key: "drinks",
      label: "Getränke",
      link: "/drinks",
      icon: <LocalBar />,
    },
    {
      key: "eat",
      label: "Speisen",
      link: "/eat",
      icon: <Restaurant />,
    },
    {
      key: "history",
      label: "Bestellungen",
      link: "/history",
      icon: <RestoreIcon />,
    },
    {
      key: "pay",
      label: "Bezahlen",
      link: "/pay",
      icon: <Payment />,
    },
  ];
  return (
    <>
      <ResponsiveDrawer drawerItems={props.drawerItems}>
        {props.children}
        <SimpleBottomNavigation items={bottomNavItems} />
      </ResponsiveDrawer>
    </>
  );
};
