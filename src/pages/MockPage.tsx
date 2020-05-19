import React from "react";

import Layout from "../containers/Layout";

export default (props: any) => {
  return (
    <Layout
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
      <h2>Hi MockPage</h2>
    </Layout>
  );
};
