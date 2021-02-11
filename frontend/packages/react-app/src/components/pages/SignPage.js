import * as React from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useCeramic from "../../hooks/useCeramic";
import useIdxBasicProfile from "../../hooks/useIdxBasicProfile";
import useThreadDB from "../../hooks/useThreadDB";
import useManifestoModel from "../../hooks/useManifestoModel";
import { useEffect, useState } from "react";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";
import useSignManifesto from "../../hooks/useSignManifesto";
import { SignPageTemplate } from "../templates/SignPageTemplate";
import useBuckets from "../../hooks/useBuckets";
import Web3 from "web3";
import useWalletAddressDidsModel from "../../hooks/useWalletAddressDidsModel";

function WitnessSignPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const { buckets, bucketKey } = useBuckets();
  const {
    name: userName,
    setName,
    image,
    setImage,
    imageURL,
    setImageURL,
    saveIdxBasicProfile,
  } = useIdxBasicProfile(idx, buckets, bucketKey);
  const { client, isInitialized } = useThreadDB();
  const [manifestoDocId, setManifestoDocId] = useState("");
  const { manifesto, getManifesto } = useManifestoModel(client);
  const { tokenBasicInfo, getTokenBasicInfo } = useTokenBasicInfo(ceramic, idx);
  const { signManifestoAndSave, isSignedAndSaved } = useSignManifesto(
    provider,
    ceramic,
    idx,
    client
  );
  const { saveWalletAddressDid } = useWalletAddressDidsModel(client);

  // TODO move as hooks
  useEffect(() => {
    const f = async () => {
      if (provider === undefined || idx === undefined || client === undefined) {
        return;
      }
      const web3 = new Web3(provider);
      const account = (await web3.eth.getAccounts())[0];
      const did = idx.id.toString();
      if (
        account === undefined ||
        account === "" ||
        did === undefined ||
        did === ""
      ) {
        return;
      }
      await saveWalletAddressDid(account, did);
    };
    f();
  }, [provider, idx, client]);

  useEffect(() => {
    if (manifesto === undefined || manifesto.manifesto_doc_id === undefined) {
      return;
    }
    getTokenBasicInfo(manifesto.manifesto_doc_id);
  }, [manifesto, getTokenBasicInfo]);

  useEffect(() => {
    if (
      tokenBasicInfo === undefined ||
      tokenBasicInfo.manifestoCid === undefined ||
      tokenBasicInfo.manifestoCid === ""
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
    <SignPageTemplate
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
      tokenBasicInfo={tokenBasicInfo}
      userName={userName}
      setName={setName}
      image={image}
      setImage={setImage}
      imageURL={imageURL}
      setImageURL={setImageURL}
      manifestoDocId={manifestoDocId}
      setManifestoDocId={setManifestoDocId}
      manifesto={manifesto}
      getManifesto={getManifesto}
      saveIdxBasicProfile={saveIdxBasicProfile}
      signManifestoAndSave={signManifestoAndSave}
      isSignedAndSaved={isSignedAndSaved}
    />
  );
}

export default WitnessSignPage;
