import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import Layout from "../containers/Layout";

export default {
  title: "Layout",
  component: Layout,
};

export const WithDevider = (props) => {
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
