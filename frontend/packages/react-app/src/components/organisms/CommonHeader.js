import * as React from "react";
import { Button, Header } from "../index";
import { Link } from "react-router-dom";
import WalletButton from "../atoms/WalletButton";

const CommonHeader = ({ provider, loadWeb3Modal, logoutOfWeb3Modal }) => (
  <Header>
    <Link to="/">
      <Button>Home</Button>
    </Link>
    <Link to="/creator/basic">
      <Button>Register basic info</Button>
    </Link>
    <Link to="/creator/token">
      <Button>Create token</Button>
    </Link>
    <Link to="/witness/sign">
      <Button>Sign</Button>
    </Link>
    <Link to="/token/address">
      <Button>Token page</Button>
    </Link>
    <WalletButton
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
    />
  </Header>
);

export default CommonHeader;
