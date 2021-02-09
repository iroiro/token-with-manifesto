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

function WitnessSignPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const { name: userName } = useIdxBasicProfile(idx);
  const { client, isInitialized } = useThreadDB();
  const [manifestoDocId, setManifestoDocId] = useState("");
  const { manifesto, getManifesto } = useManifestoModel(client);
  const { tokenBasicInfo, getTokenBasicInfo } = useTokenBasicInfo(ceramic, idx);

  useEffect(() => {
    if (manifesto === undefined || manifesto.manifesto_doc_id === undefined) {
      return;
    }
    getTokenBasicInfo(manifesto.manifesto_doc_id);
  }, [manifesto, getTokenBasicInfo]);

  // TODO Integrate with template
  return (
    <div>
      <CommonHeader
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <Main>
        <Typography>Manifesto</Typography>
        <TextField
          label="Input Manifesto ID"
          onChange={(e) => setManifestoDocId(e.target.value)}
        />
        <Button onClick={() => getManifesto(manifestoDocId)}>
          Download Manifesto
        </Button>
        <Typography>Token Info</Typography>
        <Typography>Name: {tokenBasicInfo.token.name}</Typography>
        <Typography>Symbol: {tokenBasicInfo.token.symbol}</Typography>
        <Typography>
          Total Supply: {tokenBasicInfo.token.totalSupply}
        </Typography>
        <Typography>Decimals: {tokenBasicInfo.token.decimals}</Typography>
        <Typography>Fill in your info</Typography>
        <TextField value={userName} />
        <Button>Save Profile</Button>
        <Button>Sign</Button>
      </Main>
    </div>
  );
}

export default WitnessSignPage;
