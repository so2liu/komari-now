import React from "react";
import ProductCard from "../components/ProductCard";
import CardList from "../components/CardList";
import Rating from "../components/UI/Rating";
import CardBase from "../components/UI/CardBase2";
import TextInfoContent from "../components/UI/TextInfoContent";
import { mockMenu } from "../mock";

export default {
  title: "ProductCard2",
  component: ProductCard,
};

export const FullWithSushi = () => {
  return <ProductCard product={mockSushi} />;
};

export const FullWithDrink = () => {
  return (
    <>
      <ProductCard product={mockDrink} />
      <pre>{JSON.stringify(mockDrink, null, 2)}</pre>
      <ProductCard product={mockDrink2} />
      <pre>{JSON.stringify(mockDrink2, null, 2)}</pre>
    </>
  );
};

export const RatingComponent = () => {
  return <Rating rating={4.5} />;
};

export const ListWithSushi = () => {
  const productName = Object.keys(mockSushi)[0];
  const productContent = mockSushi[productName];
  return (
    <CardList
      mainName={productName}
      subs={productContent.sub}
      onClick={(id) => {
        console.log(id);
      }}
    />
  );
};

export const ListWithDrink = () => {
  const productName = Object.keys(mockDrink)[0];
  const productContent = mockDrink[productName];
  return (
    <CardList
      mainName={productName}
      subs={productContent.sub}
      onClick={(id) => {
        console.log(id);
      }}
    />
  );
};

export const BaseWithSushi = () => {
  const productName = Object.keys(mockSushi)[0];
  const productContent = mockSushi[productName];
  const { DE } = productContent;
  return <CardBase heading={productName} body={DE} />;
};

export const BaseWithDrink = () => {
  const productName = Object.keys(mockDrink)[0];
  const productContent = mockDrink[productName];
  const { DE } = productContent;
  return <CardBase heading={productName} body={DE} />;
};

export const TextField = () => {
  const content = {
    overline: <Rating rating={4} />,
    heading: "Heading",
    body: "body",
  };
  return <TextInfoContent {...content} />;
};

const mockSushi = {
  Sashimi: mockMenu.food.Sushi.Sashimi,
};

const mockDrink = {
  "Mongo Shake":
    mockMenu.drinks["Hausgemachte Frische Getränke"]["Mongo Shake"],
};
const mockDrink2 = {
  "Very Berry": mockMenu.drinks["Hausgemachte Frische Getränke"]["Very Berry"],
};
