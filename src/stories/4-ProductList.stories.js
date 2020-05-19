import React from "react";
import ProductList from "../containers/ProductList";
import partnerInfo from "../mock/taumi_menu.json";
import { Container } from "@material-ui/core";

const MENU = partnerInfo.taumi.menu;

export default {
  title: "ProductList",
  component: ProductList,
};

export const Eat = () => {
  return <ProductList products={mockEat} />;
};

export const Sushi = () => {
  return <ProductList products={mockSushi} />;
};

export const Drinks = () => {
  return (
    <Container>
      <ProductList products={mockDrinks} />
    </Container>
  );
};

const mockEat = MENU.normal.Hauptspeise;
const mockSushi = MENU.normal.Sushi;
const mockDrinks = MENU.drinks["Hausgemachte Frische Getränke"];
