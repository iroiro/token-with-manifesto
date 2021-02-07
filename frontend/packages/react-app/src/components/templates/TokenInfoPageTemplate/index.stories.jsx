import React from "react";
import { TokenInfopageTemplate } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Templates/TokenInfopageTemplate",
  component: TokenInfopageTemplate,
};

const Template = (args) => (
  <BrowserRouter>
    <TokenInfopageTemplate {...args} />
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
  manifestoUrl: "http://example.com/manifestoURL",
  creator: {
    userName: "John Doe",
    iconImageUrl: "https://placehold.jp/150x150.png",
  },
  witness: [
    {
      userName: "witness1",
      iconImageUrl: "",
    },
    {
      userName: "witness2",
      iconImageUrl: "",
    },
    {
      userName: "witness3",
      iconImageUrl: "",
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  value: value,
};
