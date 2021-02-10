import * as React from "react";
// import { Button } from "../index";
import Button from "@material-ui/core/Button";

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      variant="outlined"
      color="primary"
      disableElevation
      style={{ width: "32%", minWidth: 120, maxWidth: 240 }}
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

export default WalletButton;
