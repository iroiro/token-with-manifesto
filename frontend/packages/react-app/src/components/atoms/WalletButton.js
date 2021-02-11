import * as React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { theme } from "../util/style/theme";

const StyledButton = styled(Button)`
  width: 32%;
  min-width: 150px;
  max-width: 240px;
  padding: 8px;
  ${theme.breakpoints.down(600)} {
    padding: 4px 12px;
    font-size: 0.8rem;
  }
`;

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <StyledButton
      variant="outlined"
      color="primary"
      disableElevation
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </StyledButton>
  );
}

export default WalletButton;
