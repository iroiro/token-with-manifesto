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
  tokenInfo: {
    token: {
      decimals: 2,
      deployedAddress: "0x2e34F6AD7d16e9b2763a89429fF2C36673729E60",
      name: "Test token",
      symbol: "TST",
      totalSupply: "9450000000",
    },
  },
  creatorInfo: {
    imageUrl: "",
    name: "wildmouse",
  },
  witness: [
    {
      name: "witness1",
      imageUrl: "",
    },
    {
      name: "witness2",
      imageUrl: "",
    },
    {
      name: "witness3",
      imageUrl: "",
    },
  ],
  rows: [],
};
