import React from "react";

import Layout from "../containers/Layout";

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
      <h2>Hi {pageURL.toUpperCase()} Page</h2>
    </Layout>
  );
};
