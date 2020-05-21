import React, { useContext } from "react";
import RestoreIcon from "@material-ui/icons/Restore";
import {
  LocalBar,
  Restaurant,
  Payment,
  ShoppingBasket,
} from "@material-ui/icons";

import ResponsiveDrawer from "../components/Sidebar";
import SimpleBottomNavigation from "../components/BottomNav";
import { Box } from "@material-ui/core";
import { OrderContext } from "../stores";

export default (props: {
  drawerItems: {
    label: string;
    key: string;
  }[][];
  // onDrawerClick: (x: string) => void;
  onDrawerClick: any;
  children: React.ReactNode | React.ReactNode[];
}) => {
  const order = useContext(OrderContext);
  return (
    <ResponsiveDrawer
      tableID={order.state.tableID}
      location={order.state.location}
      drawerItems={props.drawerItems}
      onDrawerClick={(x: string) => {
        props.onDrawerClick(x);
      }}
    >
      <Box pb={10} pt={6}>
        {props.children}
      </Box>
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
