import React, { useContext } from "react";
import {
  LocalBar,
  Restaurant,
  Payment,
  ShoppingBasket,
  ShoppingCart,
} from "@material-ui/icons";

import ResponsiveDrawer from "../components/Sidebar";
import SimpleBottomNavigation from "../components/BottomNav";
import { Box, Badge, Container } from "@material-ui/core";
import { OrderContext } from "../stores";
import { getTotalQuantity } from "../utils";
import PrettyJSON from "../components/PrettyJSON";

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
      <Box pb={10} pt={5}>
        <Container>{props.children}</Container>
      </Box>
      <SimpleBottomNavigation
        items={bottomNavItems(getTotalQuantity(order.state))}
      />
    </ResponsiveDrawer>
  );
};

const bottomNavItems = (badgesNum: number) => [
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
    icon: (
      <Badge badgeContent={badgesNum} color="secondary">
        <ShoppingCart />
      </Badge>
    ),
  },
  {
    key: "pay",
    label: "Bezahlen",
    link: "/pay",
    icon: <Payment />,
  },
];
