import React from "react";
import { UserAvatar } from "./index";

export default {
  title: "molecules/UserAvatar",
  component: UserAvatar,
};

const Template = (args) => <UserAvatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  userName: "John Doe",
  iconImageUrl: "https://placehold.jp/150x150.png",
};
