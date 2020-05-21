import React, { useContext } from "react";
import Layout from "../containers/Layout";
import CartTable from "../components/CartTable";
import CartTableUnchangable from "../components/CartTableUnchangable";
import { Button, Grid, Box, Typography } from "@material-ui/core";
import { OrderHistoryContext, OrderContext } from "../stores";
import { Divider } from "@material-ui/core";

export default () => {
  const order = useContext(OrderContext);
  const orderHistory = useContext(OrderHistoryContext);
  return (
    <>
      <Layout drawerItems={[[]]} onDrawerClick={() => {}}>
        <Box m={2}>
          <Typography variant="h5">Kaufwagen</Typography>
        </Box>

        {order.state.order.length > 0 ? (
          <CartTableWithBtn />
        ) : (
          <Box m={2}>
            <Typography variant="body1">Ihre Kaufwagen ist leer.</Typography>
          </Box>
        )}
        {orderHistory.orderHistory.length > 0 && (
          <>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
            <Box m={2}>
              <Typography variant="h5">Gesendete Bestellungen</Typography>
            </Box>
            {orderHistory.orderHistory.map((order, index) => (
              <Box mt={2} key={index}>
                <CartTableUnchangable order={order} />
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
  const orderHistory = useContext(OrderHistoryContext);

  function handleSend() {
    orderHistory.setOrderHistory((pre) => [...pre, order.state]);
    order.dispatch({ type: "Clear" });
  }

  const SendBtn = (
    <Button variant="contained" color="primary" onClick={handleSend}>
      Senden
    </Button>
  );
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <CartTable />
      </Grid>
      <Grid item>
        <Box m={2}>{SendBtn}</Box>
      </Grid>
    </Grid>
  );
};
