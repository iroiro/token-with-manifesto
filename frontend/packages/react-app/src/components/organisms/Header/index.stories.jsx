import React from 'react';
import { Header } from './index';
import { BrowserRouter } from "react-router-dom";

export default {
  title: 'Organisms/Header',
  component: Header,
}

const Template = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
  )

export const Default = Template.bind({})