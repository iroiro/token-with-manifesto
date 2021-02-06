import * as React from "react";
import { Button, Image, Link as AnchorLink, Main } from "./index";
import useWeb3Modal from "../hooks/useWeb3Modal";
import useCeramic from "../hooks/useCeramic";
import CommonHeader from "./CommonHeader";
import logo from "../ethereumLogo.png";

function BasicInfoPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  console.log(ceramic, idx);

  return (
    <div>
      <CommonHeader
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <Main>basic info page</Main>
    </div>
  );
}

export default BasicInfoPage;
