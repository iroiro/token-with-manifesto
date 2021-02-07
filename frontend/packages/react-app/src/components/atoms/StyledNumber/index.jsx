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
`;

const InnerNumber = styled.span`
  color: #fff;
`;

export const StyledNumber = ({ number }) => {
  return (
    <>
      <Circle>
        <InnerNumber>{number}</InnerNumber>
      </Circle>
    </>
  );
};
