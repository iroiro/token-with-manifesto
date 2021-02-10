import * as React from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { MainPageTemplate } from "../templates/MainPageTemplate";

function MainPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  return (
    <>
      <MainPageTemplate
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
    </>
  );
}

export default MainPage;
