import React from "react";
import { TokenInfo } from "./index";

export default {
  title: "Molecules/TokenInfo",
  component: TokenInfo,
};

const Template = (args) => <TokenInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  tokenName: "MyToken",
  symbol: "NTK",
  totalSupply: 10000000,
  decimals: 6,
};
