import * as React from "react";
import { Main } from "../index";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useCeramic from "../../hooks/useCeramic";
import CommonHeader from "../organisms/CommonHeader";
import { Button, TextField } from "@material-ui/core";
import useIdxBasicProfile from "../../hooks/useIdxBasicProfile";
import Typography from "@material-ui/core/Typography";
import useThreadDB from "../../hooks/useThreadDB";
import useManifestoModel from "../../hooks/useManifestoModel";
import { useEffect, useState } from "react";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";
import useSignManifesto from "../../hooks/useSignManifesto";
import { SignPageTemplate } from "../templates/SignPageTemplate";

function WitnessSignPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const { name: userName, imageURL, saveIdxBasicProfile } = useIdxBasicProfile(
    idx
  );
  const { client, isInitialized } = useThreadDB();
  const [manifestoDocId, setManifestoDocId] = useState("");
  const { manifesto, getManifesto } = useManifestoModel(client);
  const { tokenBasicInfo, getTokenBasicInfo } = useTokenBasicInfo(ceramic, idx);
  const { signManifestoAndSave } = useSignManifesto(
    provider,
    ceramic,
    idx,
    client
  );

  useEffect(() => {
    if (manifesto === undefined || manifesto.manifesto_doc_id === undefined) {
      return;
    }
    getTokenBasicInfo(manifesto.manifesto_doc_id);
  }, [manifesto, getTokenBasicInfo]);

  useEffect(() => {
    if (
      tokenBasicInfo === undefined ||
      tokenBasicInfo.manifestoCid === undefined
    ) {
      return;
    }
    window.open(
      `https://gateway.pinata.cloud/ipfs/${tokenBasicInfo.manifestoCid}`,
      "_blank"
    );
  }, [tokenBasicInfo]);

  // TODO Integrate with template
  return (
    <div>
      <CommonHeader
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <SignPageTemplate
        tokenBasicInfo={tokenBasicInfo}
        userName={userName}
        imageURL={imageURL}
        manifestoDocId={manifestoDocId}
        setManifestoDocId={setManifestoDocId}
        manifesto={manifesto}
        getManifesto={getManifesto}
        saveIdxBasicProfile={saveIdxBasicProfile}
      />

      <Typography>Fill in your info</Typography>
      <TextField value={userName} />
      <Button>Save Profile</Button>
      <Button onClick={() => signManifestoAndSave(manifesto, manifestoDocId)}>
        Sign
      </Button>
      <a
        href="https://gateway.pinata.cloud/ipfs/QmSAdbek1DDb91BM8no29LeRxapusH72pmMZWs8zokGt6p"
        target="_blank"
        rel="noreferrer noopener"
      >
        Click me
      </a>
    </div>
  );
}

export default WitnessSignPage;
