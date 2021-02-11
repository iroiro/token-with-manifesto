import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { MainPageTemplate } from "../templates/MainPageTemplate";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";
import useThreadDB from "../../hooks/useThreadDB";
import useManifestoModel from "../../hooks/useManifestoModel";
import useCeramic from "../../hooks/useCeramic";
import { useHistory } from "react-router-dom";

function MainPage() {
  const history = useHistory();
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const { tokenBasicInfo, getTokenBasicInfo } = useTokenBasicInfo(ceramic, idx);
  const { client, isInitialized } = useThreadDB();
  const { manifesto, getManifesto } = useManifestoModel(client);
  const [manifestoDocId, setManifestoDocId] = useState("");

  const handleTextChange = useCallback(
    (e) => {
      setManifestoDocId(e.target.value);
    },
    [setManifestoDocId]
  );

  const handleViewButtonClick = useCallback(() => {
    getManifesto(manifestoDocId);
    getTokenBasicInfo(manifestoDocId);
  }, [manifestoDocId, getManifesto]);

  useEffect(() => {
    if (tokenBasicInfo.manifestoCid === "") {
      return;
    }

    const tokenAddress = tokenBasicInfo.token.deployedAddress;
    if (tokenAddress === undefined) {
      console.log("No deployed");
      history.push(`creator/token/${manifestoDocId}`);
    } else {
      console.log("deployed");
      history.push(`/token/${manifestoDocId}`);
    }
  }, [tokenBasicInfo]);

  return (
    <>
      <MainPageTemplate
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        textValue={manifestoDocId}
        handleTextChange={handleTextChange}
        handleViewButtonClick={handleViewButtonClick}
      />
    </>
  );
}

export default MainPage;
