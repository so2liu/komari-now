import React from "react";
import ProductList from "../containers/ProductList";
import { Container } from "@material-ui/core";
import { mockMenu } from "../mock";

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

const mockEat = mockMenu.food.Hauptspeise;
const mockSushi = mockMenu.food.Sushi;
const mockDrinks = mockMenu.drinks["Hausgemachte Frische Getränke"];
