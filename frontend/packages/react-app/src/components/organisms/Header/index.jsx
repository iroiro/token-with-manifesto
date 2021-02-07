import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../util/style/theme";

const Wrapper = styled.div`
  padding: 24px;
`;

const Logo = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  color: #000;
  ${theme.breakpoints.down(600)} {
    font-size: 1rem;
  }
`;

export const Header = () => {
  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Logo>Token with Manifesto</Logo>
      </Link>
    </Wrapper>
  );
};
