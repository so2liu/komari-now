import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import Layout from "../containers/Layout";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Layout",
  component: Layout,
};

export const WithDevider = (props) => {
  return (
    <Router>
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
    </Router>
  );
};
