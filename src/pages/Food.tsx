import React, { useState } from "react";

import Layout from "../containers/Layout";
import { mapDrawerList } from "../utils";
import { TMenu } from "../interfaces";
import ProductList from "../containers/ProductList";

export default (props: { MENU: TMenu }) => {
  const { MENU } = props;
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
      <ProductList products={MENU["food"][second]} />
    </Layout>
  );
};

const drawerItems = [
  ["Mittagstisch", "Vorspeise"],
  ["Hauptspeise", "Sushi", "Sushiset"],
];
