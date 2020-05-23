import React from "react";
import { IProducts, TID, IRating } from "../interfaces";
import Rating from "./UI/Rating";
import CardBase from "./UI/CardBase2.jsx";
import CardList from "./CardList";
import { useImageURL } from "../services/firebase";
import { Grid, Box } from "@material-ui/core";

const mockImgSrc =
  "http://taumi-restaurant.de/wp-content/uploads/2018/06/22089058_784295008441684_3764944331338200807_n.jpg";

export default (props: {
  product: IProducts;
  rating: number;
  ratingAble?: boolean;
  disableSubs?: boolean;
  onClickList: (id: TID) => void;
  handleRating?: (value: number | null) => void;
}) => {
  const { product, ratingAble, disableSubs, rating } = props;
  const productName = Object.keys(product)[0];
  const productContent = product[productName];
  const imageURL = useImageURL(productContent.imgSrc);

  return (
    <Box>
      <CardBase
        imgSrc={imageURL.isURL ? imageURL.url : mockImgSrc}
        header={
          <Grid container justify="center">
            <Rating
              rating={rating}
              readonly={!ratingAble}
              handleChange={props.handleRating}
            />
          </Grid>
        }
        heading={productName}
        body={productContent.DE}
      >
        {!disableSubs && (
          <CardList
            mainName={productName}
            subs={productContent.sub}
            onClick={props.onClickList}
          />
        )}
      </CardBase>
    </Box>
  );
};
