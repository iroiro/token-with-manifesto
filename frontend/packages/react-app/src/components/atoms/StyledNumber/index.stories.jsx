import React from "react";
import { StyledNumber } from "./index";

export default {
  title: "Atoms/StyledNumber",
  component: StyledNumber,
};

const Template = (args) => <StyledNumber {...args} />;

export const Default = Template.bind({});
Default.args = {
  number: 1,
};
