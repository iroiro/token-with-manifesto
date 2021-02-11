import * as React from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useCeramic from "../../hooks/useCeramic";
import { useEffect, useState } from "react";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";
import useIdxBasicProfile from "../../hooks/useIdxBasicProfile";
import { CreateTokenPageTemplate } from "../templates/CreateTokenPageTemplate";
import { useHistory, useParams } from "react-router-dom";
import useManifestoModel from "../../hooks/useManifestoModel";
import useThreadDB from "../../hooks/useThreadDB";
import useCreateToken from "../../hooks/useCreateToken";
import useBuckets from "../../hooks/useBuckets";
import Web3 from "web3";
import useWalletAddressDidsModel from "../../hooks/useWalletAddressDidsModel";

function CreateTokenPage() {
  const history = useHistory();
  const { manifestoDocId } = useParams();
  const isNew = manifestoDocId === undefined;

  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const { buckets, bucketKey, error: bucketError } = useBuckets();
  const {
    name,
    setName,
    imageURL,
    setImageURL,
    saveIdxBasicProfile,
  } = useIdxBasicProfile(idx, buckets, bucketKey);
  const [imageFile, setImageFile] = useState(undefined);
  const [isSaved, setIsSaved] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [manifestoFile, setManifestoFile] = useState(undefined);
  const { client } = useThreadDB();
  const { manifesto, getManifesto, saveManifesto } = useManifestoModel(
    client,
    idx
  );
  const {
    doc,
    isUpdated,
    error,
    tokenBasicInfo,
    getTokenBasicInfo,
    setTokenBasicInfo,
    saveTokenBasicInfo,
    updateTokenBasicInfo,
  } = useTokenBasicInfo(ceramic, idx, buckets, bucketKey);
  const { deployedAddress, createToken } = useCreateToken(provider);
  const [viewTokenInfo, setViewTokenInfo] = useState(false);
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
    setIsSaved(manifestoDocId !== undefined);
  }, [manifestoDocId, setIsSaved]);

  useEffect(() => {
    getTokenBasicInfo(manifestoDocId);
  }, [manifestoDocId, getTokenBasicInfo]);

  useEffect(() => {
    getManifesto(manifestoDocId);
  }, [getManifesto, manifestoDocId]);

  useEffect(() => {
    updateTokenBasicInfo(doc, deployedAddress);
  }, [doc, deployedAddress, updateTokenBasicInfo]);

  useEffect(() => {
    if (doc === undefined) {
      return;
    }
    if (!isUpdated && !viewTokenInfo) {
      return;
    }
    history.push(`/token/${doc.id.toString()}`);
  }, [isUpdated, history, doc, viewTokenInfo]);

  useEffect(() => {
    const f = async () => {
      if (!isNew || doc === undefined) {
        return;
      }
      await saveManifesto(doc);
    };
    f();
  }, [isNew, doc, error, saveManifesto]);

  return (
    <CreateTokenPageTemplate
      createToken={createToken}
      doc={doc}
      imageURL={imageURL}
      imageFile={imageFile}
      manifesto={manifesto}
      manifestoFile={manifestoFile}
      name={name}
      pdfName={pdfName}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
      saveTokenBasicInfo={saveTokenBasicInfo}
      saveIdxBasicProfile={saveIdxBasicProfile}
      setViewTokenInfo={setViewTokenInfo}
      setImage={setImageURL}
      setImageFile={setImageFile}
      setManifestoFile={setManifestoFile}
      setName={setName}
      setPdfName={setPdfName}
      setTokenBasicInfo={setTokenBasicInfo}
      tokenBasicInfo={tokenBasicInfo}
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
    />
  );
}

export default CreateTokenPage;
