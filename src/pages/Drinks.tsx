import React, { useState } from "react";

import Layout from "../containers/Layout";
import { mapDrawerList } from "../utils";
import { TMenu } from "../interfaces";
import ProductList from "../containers/ProductList";

export default (props: { MENU: TMenu }) => {
  const { MENU } = props;
  const drawerItems = [
    ["Tee", "Koffee", "Hausgemachte Frische Getränke", "Kalte Getränke"],
    [
      "Asiatische Getränke",
      "Bier",
      "Cocktails",
      "Offene Weine (0.2L)",
      "Flaschenwein (0.75L)",
    ],
  ];
  const [second, setSecond] = useState(drawerItems[0][1]);
  function handleDrawerClick(label: string) {
    console.log(label);
    setSecond(label);
  }
  return (
    <Layout
      drawerItems={mapDrawerList(drawerItems)}
      onDrawerClick={handleDrawerClick}
    >
      <ProductList products={MENU["drinks"][second]} />
    </Layout>
  );
};
