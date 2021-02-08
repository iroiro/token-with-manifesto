import React from "react";
import { StyledNumber } from "./index";
import Typography from "@material-ui/core/Typography";

export default {
  title: "Molecures/StyledNumber",
  component: StyledNumber,
};

const Template = (args) => (
  <>
    <StyledNumber {...args}>
      <Typography variant="h5" component="h2" style={{ marginBottom: 8 }}>
        Fill in your info
      </Typography>
    </StyledNumber>
  </>
);

export const Default = Template.bind({});
Default.args = {
  number: 1,
};
