import React from "react";
import styled from "styled-components";
import { theme } from "../../util/style/theme";
import Skeleton from "@material-ui/lab/Skeleton";

const StyledDt = styled.dt`
  font-size: 14px;
  color: #7e7e7e;
`;

const StyledDd = styled.dd`
  margin: 0;
  font-weight: 500;
  min-width: 120px;
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
        <StyledDd>{tokenName ?? <Skeleton variant="text" />}</StyledDd>
      </Wrapper>
      <Wrapper>
        <StyledDt>Symbol:</StyledDt>
        <StyledDd>{symbol ?? <Skeleton variant="text" />}</StyledDd>
      </Wrapper>
      <Wrapper>
        <StyledDt>Total Supply:</StyledDt>
        <StyledDd>
          {totalSupply ? (
            totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          ) : (
            <Skeleton variant="text" />
          )}
        </StyledDd>
      </Wrapper>
      <Wrapper>
        <StyledDt>Decimals:</StyledDt>
        <StyledDd>{decimals ?? <Skeleton variant="text" />}</StyledDd>
      </Wrapper>
    </dl>
  </>
);
