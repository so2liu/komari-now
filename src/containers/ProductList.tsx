import React, { useContext } from "react";
import { IProduct, TID } from "../interfaces";
import ProductCard from "../components/ProductCard";
import { Grid, Box } from "@material-ui/core";
import { OrderContext, MenuContext } from "../stores";

export default (props: { products: IProduct }) => {
  const { products } = props;
  const order = useContext(OrderContext);
  const menu = useContext(MenuContext);
  function handleClickList(id: TID) {
    order.dispatch({
      type: "append",
      payload: {
        id,
        menu,
      },
    });
  }
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
