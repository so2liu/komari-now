import React from "react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import TempComponent from "../components/TempComponent.js";

export default {
  title: "Welcome",
  component: Welcome,
};

export const ToStorybook = () => <Welcome showApp={linkTo("Button")} />;

export const Temp = () => <TempComponent />;

ToStorybook.story = {
  name: "to Storybook",
};
