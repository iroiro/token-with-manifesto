import React from "react";
import styled from "styled-components";
import { theme } from "../../util/style/theme";

const StyledDt = styled.dt`
  font-size: 14px;
  color: #7e7e7e;
`;

const StyledDd = styled.dd`
  margin: 0;
  font-weight: 500;
  ${theme.breakpoints.down(600)} {
    text-align: right;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

export const TokenInfo = ({ tokenName, symbol, totalSupply, decimals }) => (
  <>
    <dl>
      <Wrapper>
        <StyledDt>Name:</StyledDt>
        <StyledDd>{tokenName}</StyledDd>
      </Wrapper>
      <Wrapper>
        <StyledDt>Symbol:</StyledDt>
        <StyledDd>{symbol}</StyledDd>
      </Wrapper>
      <Wrapper>
        <StyledDt>Total Supply:</StyledDt>
        <StyledDd>
          {totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </StyledDd>
      </Wrapper>
      <Wrapper>
        <StyledDt>Decimals:</StyledDt>
        <StyledDd>{decimals}</StyledDd>
      </Wrapper>
    </dl>
  </>
);
