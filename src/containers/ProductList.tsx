import React, { useContext } from "react";
import { IProducts, TID, IRating } from "../interfaces";
import ProductCard from "../components/ProductCard";
import { Grid, Box } from "@material-ui/core";
import {
  OrderContext,
  MenuContext,
  RatingContext,
  RatingDefault,
} from "../stores";
import { updateRating, findRatingFromList } from "../utils";
import { setRating } from "../services/firebase";

export default (props: {
  products: IProducts;
  ratingAble?: boolean;
  disableSubs?: boolean;
}) => {
  const { products } = props;
  const order = useContext(OrderContext);
  const menu = useContext(MenuContext);
  const rating = useContext(RatingContext);

  function handleClickList(id: TID) {
    order.dispatch({
      type: "Append",
      payload: {
        id,
        menu,
      },
    });
  }

  async function sendRating(
    name: string,
    ratedNum: number = 10,
    rating: number = 5,
    newRating: number | null = 5
  ) {
    if (!newRating) return;
    const [updatedRatedNum, updatedRating] = updateRating(
      ratedNum,
      rating,
      newRating
    );
    const response = await setRating(name, updatedRatedNum, updatedRating);
    if (response.isError) throw new Error(response.error);
  }

  return (
    <>
      <Grid container direction="column" spacing={0}>
        {Object.keys(products).map((mainName) => {
          if (!mainName) return;
          const product = products[mainName];
          const ratingField =
            findRatingFromList(mainName, rating) ?? RatingDefault;
          return (
            <Grid item key={mainName}>
              <Box mt={4}>
                <ProductCard
                  product={{ [mainName]: product }}
                  rating={ratingField.rating}
                  ratingAble={props.ratingAble}
                  handleRating={(rating: number | null) => {
                    sendRating(
                      mainName,
                      ratingField.ratedNum,
                      ratingField.rating,
                      rating
                    );
                  }}
                  disableSubs={props.disableSubs}
                  onClickList={handleClickList}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
