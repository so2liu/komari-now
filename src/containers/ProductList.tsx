import React, { useState } from "react";
import { IProduct, TID } from "../interfaces";
import ProductCard from "../components/ProductCard";
import { Grid, Box } from "@material-ui/core";

export default (props: { products: IProduct }) => {
  const { products } = props;
  function handleClickList(id: TID) {}
  return (
    <>
      <Grid container direction="column" spacing={0}>
        {Object.keys(products).map((mainName) => {
          const product = products[mainName];
          return (
            <Grid item key={mainName}>
              <Box mt={4}>
                <ProductCard
                  product={{ [mainName]: product }}
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
