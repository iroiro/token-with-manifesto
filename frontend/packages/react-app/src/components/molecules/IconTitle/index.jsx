import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 8px;
`;

export const IconTitle = ({ icon, title }) => {
  return (
    <Wrapper>
      <IconWrapper>{icon}</IconWrapper>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
    </Wrapper>
  );
};
