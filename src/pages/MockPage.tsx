import React from "react";

import Layout from "../containers/Layout";
import { Container } from "@material-ui/core";

export default (props: any) => {
  const pageURL = window.location.href.split("/").slice(-1)[0];
  return (
    <Layout
      onDrawerClick={() => {}}
      drawerItems={[
        [{ label: "Vorspeise", key: "Vorspeise" }],
        [
          {
            label: "Hauptspeise",
            key: "Hauptspeise",
          },
          {
            label: "Sushi",
            key: "Sushi",
          },
          {
            label: "Sushi Set",
            key: "Sushi Set",
          },
        ],
      ]}
    >
      <Container>
        <h2>Hi {pageURL.toUpperCase()} Page</h2>
        <h3>This page is still in development.</h3>
      </Container>
    </Layout>
  );
};
