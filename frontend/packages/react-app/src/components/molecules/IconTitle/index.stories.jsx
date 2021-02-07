import React from "react";
import { IconTitle } from "./index";

export default {
  title: "Molecules/IconTitle",
  component: IconTitle,
};

const Template = (args) => <IconTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: "✍️",
  title: "Sign Manifest",
};
