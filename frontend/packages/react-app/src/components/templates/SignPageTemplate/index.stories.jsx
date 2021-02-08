import React from "react";
import { SignPageTemplate } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Templates/SignPageTemplate",
  component: SignPageTemplate,
};

const Template = (args) => (
  <BrowserRouter>
    <SignPageTemplate {...args} />
  </BrowserRouter>
);

const value = {
  tokenInfo: {
    tokenAddress: "tokenAddress",
    name: "name",
    symbol: "symbol",
    decimals: 6,
    totalSupply: 10000000,
  },
  userInfo: {
    name: "",
    iconImageUrl: "",
  },
  isSigned: false,
};

export const Default = Template.bind({});
Default.args = {
  value: value,
};
