import React from "react";
import { MainPageTemplate } from "./index";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Templates/MainPage",
  component: MainPageTemplate,
};

const Template = (args) => (
  <BrowserRouter>
    <MainPageTemplate {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  isConnected: true,
};
export const NotConnected = Template.bind({});
NotConnected.args = {
  isConnected: false,
};
