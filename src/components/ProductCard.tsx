import React from "react";
import { IProduct, TID } from "../interfaces";
import Rating from "./UI/Rating";
import CardBase from "./UI/CardBase.jsx";
import CardList from "./CardList";

const mockImgSrc =
  "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80";

export default (props: {
  product: IProduct;
  onClickList: (id: TID) => void;
}) => {
  const { product } = props;
  const productName = Object.keys(product)[0];
  const productContent = product[productName];
  return (
    <>
      <CardBase
        imgSrc={mockImgSrc}
        overline={<Rating rating={productContent.rating ?? 5} readonly />}
        heading={productName}
        body={productContent.DE}
      >
        <CardList
          mainName={productName}
          subs={productContent.sub}
          onClick={props.onClickList}
        />
      </CardBase>
    </>
  );
};
