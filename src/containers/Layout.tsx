import React from "react";
import RestoreIcon from "@material-ui/icons/Restore";
import {
  LocalBar,
  Restaurant,
  Payment,
  ShoppingBasket,
} from "@material-ui/icons";

import ResponsiveDrawer from "../components/Sidebar";
import SimpleBottomNavigation from "../components/BottomNav";

export default (props: {
  drawerItems: {
    label: string;
    key: string;
  }[][];
  // onDrawerClick: (x: string) => void;
  onDrawerClick: any;
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <ResponsiveDrawer
      drawerItems={props.drawerItems}
      onDrawerClick={(x: string) => {
        props.onDrawerClick(x);
      }}
    >
      {props.children}
      <SimpleBottomNavigation items={bottomNavItems} />
    </ResponsiveDrawer>
  );
};

const bottomNavItems = [
  {
    key: "drinks",
    label: "Getränke",
    link: "/drinks",
    icon: <LocalBar />,
  },
  {
    key: "food",
    label: "Speisen",
    link: "/food",
    icon: <Restaurant />,
  },
  {
    key: "cart",
    label: "Bestellungen",
    link: "/cart",
    icon: <ShoppingBasket />,
  },
  {
    key: "pay",
    label: "Bezahlen",
    link: "/pay",
    icon: <Payment />,
  },
];
