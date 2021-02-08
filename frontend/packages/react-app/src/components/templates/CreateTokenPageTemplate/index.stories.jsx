import React from "react";
import { CreateTokenPageTemplate } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Templates/CreateTokenPageTemplate",
  component: CreateTokenPageTemplate,
};

const Template = (args) => (
  <BrowserRouter>
    <CreateTokenPageTemplate {...args} />
  </BrowserRouter>
);

const value = {
  tokenInfo: {
    tokenAddress: "",
    name: "",
    symbol: "",
    decimals: undefined,
    totalSupply: undefined,
  },
  manifesto: {
    fileName: "",
    id: "kjzl6cwe1jw14al2fdnlayp4dlho53txgdvgf0zrkuzd88eqr10z4ffx12y5rsz",
  },
  userInfo: {
    name: "",
    iconImageUrl: "",
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
  isSaved: false,
};

export const Default = Template.bind({});
Default.args = {
  value: value,
};

export const NotEnough = Template.bind({});
NotEnough.args = {
  value: {
    tokenInfo: {
      tokenAddress: "",
      name: "MyToken",
      symbol: "MTK",
      decimals: 6,
      totalSupply: 10000000,
    },
    manifesto: {
      fileName: "sample.pdf",
      id: "kjzl6cwe1jw14al2fdnlayp4dlho53txgdvgf0zrkuzd88eqr10z4ffx12y5rsz",
    },
    userInfo: {
      name: "John Doe",
      iconImageUrl: "https://placehold.jp/150x150.png",
    },
    isSaved: true,
    witness: [],
  },
};
