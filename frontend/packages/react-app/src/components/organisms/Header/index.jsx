import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../util/style/theme";
import WalletButton from "../../atoms/WalletButton";
import { Box } from "@material-ui/core";

const Logo = styled.span`
  font-weight: 500;
  font-size: 1.4rem;
  color: #000;
  ${theme.breakpoints.down(600)} {
    font-size: 1rem;
  }
`;

export const Header = ({ provider, loadWeb3Modal, logoutOfWeb3Modal }) => {
  return (
    <Box display="flex" justifyContent="space-between" p={4}>
      <Link to="/" style={{ textDecoration: "none", marginRight: 24 }}>
        <Logo>Token with Manifesto</Logo>
      </Link>
      <WalletButton
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
    </Box>
  );
};
