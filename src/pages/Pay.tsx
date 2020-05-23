import React, { useContext } from "react";
import Layout from "../containers/Layout";
import { Box, Divider, Typography, Button } from "@material-ui/core";
import ProductList from "../containers/ProductList";
import { MenuContext, OrderContext } from "../stores";
import {
  findProductFromMenuByName,
  createOrder,
  mergeOrders,
  findSubFromMenuByID,
} from "../utils";
import { IProducts, IOrder, IProduct } from "../interfaces";
import CartTableUnchangable from "../components/CartTableUnchangable";
import { useNowOrders } from "../services/firebase";

export default () => {
  const menu = useContext(MenuContext);
  const order = useContext(OrderContext);
  const nowOrder = useNowOrders(order.state.tableID);
  const mergedOrder = mergeOrders(nowOrder.order as IOrder[]);
  const products = {} as any;
  mergedOrder.IDs.forEach((id) => {
    const { firstKey, secondKey, name } = findSubFromMenuByID(id, menu);
    products[name] = menu[firstKey][secondKey][name] as IProduct;
  });

  return (
    <Layout onDrawerClick={() => {}} drawerItems={[[]]}>
      <Box mt={2} mb={2}>
        <Typography variant="h5">Zusammenfassung</Typography>
      </Box>
      {nowOrder.order.length > 0 ? (
        <>
          <CartTableUnchangable
            order={createOrder(mergedOrder.IDs, mergedOrder.quantities, menu)}
          />
          <Box mt={2} mb={2}>
            <Divider />
          </Box>
        </>
      ) : (
        <Box mt={2} mb={2}>
          <Typography variant="body1">
            Ihre Zusammenfassung ist leer.
          </Typography>
        </Box>
      )}
      {nowOrder.order.length > 0 && (
        <>
          <Box mt={2} mb={2}>
            <Typography variant="h5">Schnell Feedback</Typography>
          </Box>
          <Typography variant="overline">
            Ihre Meinung ist wichtig. Bitte geben Sie uns Ihre Beurteilung bei
            Sternzahl.
          </Typography>
        </>
      )}
      <ProductList products={products} ratingAble disableSubs />
    </Layout>
  );
};
