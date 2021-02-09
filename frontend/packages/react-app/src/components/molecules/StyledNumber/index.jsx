import React from "react";
import styled from "styled-components";
import { theme } from "../../util/style/theme";

const Circle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${theme.palette.primary.main};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 5px;
  top: 3px;
`;

const InnerNumber = styled.span`
  color: #fff;
`;

const Wrapper = styled.div`
  position: relative;
  padding-left: 38px;
  margin-left: -26px;
  ${theme.breakpoints.down(600)} {
    margin-left: 0;
  }
`;

export const StyledNumber = ({ number, children }) => {
  return (
    <Wrapper>
      <Circle>
        <InnerNumber>{number}</InnerNumber>
      </Circle>
      {children}
    </Wrapper>
  );
};
