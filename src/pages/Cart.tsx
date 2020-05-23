import React, { useContext } from "react";
import Layout from "../containers/Layout";
import CartTable from "../components/CartTable";
import CartTableUnchangable from "../components/CartTableUnchangable";
import { Button, Grid, Box, Typography } from "@material-ui/core";
import { OrderContext } from "../stores";
import { Divider } from "@material-ui/core";
import { addOrder, useNowOrders } from "../services/firebase";
import { IOrder } from "../interfaces";
import { filterNullQuantityFromOrder } from "../utils";

export default () => {
  const order = useContext(OrderContext);
  const nowOrder = useNowOrders(order.state.tableID);
  return (
    <>
      <Layout drawerItems={[[]]} onDrawerClick={() => {}}>
        <Box mt={2}>
          <Typography variant="h5">Kaufwagen</Typography>
        </Box>
        {order.state.order.length > 0 ? (
          <CartTableWithBtn />
        ) : (
          <Box mt={2}>
            <Typography variant="body1">Ihre Kaufwagen ist leer.</Typography>
          </Box>
        )}
        {nowOrder.order.length > 0 && (
          <>
            <Box mt={2}>
              <Divider />
            </Box>
            <Box mt={2}>
              <Typography variant="h5">Gesendete Bestellungen</Typography>
            </Box>
            {nowOrder.order.map((order, index) => (
              <Box mt={2} key={index}>
                <CartTableUnchangable order={order as IOrder} />
              </Box>
            ))}
          </>
        )}
      </Layout>
    </>
  );
};

const CartTableWithBtn = () => {
  const order = useContext(OrderContext);

  function handleSend() {
    addOrder(filterNullQuantityFromOrder(order.state)).then((response) => {
      switch (response.isError) {
        case false:
          order.dispatch({ type: "Clear" });
          return;
        case true:
          throw new Error(response.error);
      }
    });
  }

  const SendBtn = (
    <Button variant="contained" color="primary" onClick={handleSend}>
      Senden
    </Button>
  );
  return (
    <>
      <Box mt={2}>
        <CartTable />
      </Box>
      <Box mt={2}>{SendBtn}</Box>
    </>
  );
};
