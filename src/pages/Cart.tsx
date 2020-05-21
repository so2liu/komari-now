import React, { useState } from "react";
import Layout from "../containers/Layout";
import { mapDrawerList } from "../utils";
import CartTable from "../components/CartTable";
import { Button, Grid, Box } from "@material-ui/core";

export default () => {
  const SendBtn = (
    <Button variant="contained" color="primary">
      Senden
    </Button>
  );
  const SendSuccessBtn = (
    <Button variant="contained" disabled>
      Gesendet
    </Button>
  );
  return (
    <Layout drawerItems={[[]]} onDrawerClick={() => {}}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <CartTable />
        </Grid>
        <Grid item>
          <Box m={2}>{SendSuccessBtn}</Box>
        </Grid>
      </Grid>
    </Layout>
  );
};
