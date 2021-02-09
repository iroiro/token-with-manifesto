import * as React from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useCeramic from "../../hooks/useCeramic";
import { useEffect, useState } from "react";
import { Client } from "@textile/hub";
import { manifestosCollection, threadId } from "../../utils/textile";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";
import useIdxBasicProfile from "../../hooks/useIdxBasicProfile";
import { CreateTokenPageTemplate } from "../templates/CreateTokenPageTemplate";
import { useParams } from "react-router-dom";

function CreateTokenPage() {
  const { docId } = useParams();
  const isNew = docId === undefined;

  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const {
    name,
    setName,
    imageURL,
    setImageURL,
    saveIdxBasicProfile,
  } = useIdxBasicProfile(idx);

  const [imageFile, setImageFile] = useState(undefined);
  const [pdfName, setPdfName] = useState("");
  const [manifestoFile, setManifestoFile] = useState(undefined);
  const [manifesto, setManifesto] = useState({
    manifesto_doc_id: "",
    manifesto_doc_commit_id: "",
    creator_did: "",
    witness_signatures: [],
  });
  const {
    doc,
    error,
    tokenBasicInfo,
    getTokenBasicInfo,
    setTokenBasicInfo,
    saveTokenBasicInfo,
  } = useTokenBasicInfo(ceramic, idx);
  console.debug(pdfName, manifestoFile);

  console.debug(doc);

  useEffect(() => {
    getTokenBasicInfo(docId);
  }, [docId, ceramic, idx]);

  // TODO just teset. remove
  useEffect(() => {
    const f = async () => {
      const client = await Client.withKeyInfo({
        key: process.env.REACT_APP_THREADDB_KEY,
        secret: process.env.REACT_APP_THREADDB_SECRET,
      });
      console.debug(await client.find(threadId, manifestosCollection, {}));
    };
    f();
  }, []);

  useEffect(() => {
    const f = async () => {
      if (!isNew || doc === undefined || error !== undefined) {
        return;
      }
      const manifesto = {
        manifesto_doc_id: doc.id.toString(),
        manifesto_doc_commit_id: doc.commitId.commit.toString(),
        creator_did: idx.id,
        witness_signatures: [],
      };
      const client = await Client.withKeyInfo({
        key: process.env.REACT_APP_THREADDB_KEY,
        secret: process.env.REACT_APP_THREADDB_SECRET,
      });
      await client.create(threadId, manifestosCollection, [manifesto]);
      setManifesto(manifesto);
    };
    f();
  }, [isNew, doc]);

  // TODO Integrate with template
  return (
    <CreateTokenPageTemplate
      doc={doc}
      image={imageURL}
      imageFile={imageFile}
      manifesto={manifesto}
      manifestoFile={manifestoFile}
      name={name}
      pdfName={pdfName}
      saveTokenBasicInfo={saveTokenBasicInfo}
      saveIdxBasicProfile={saveIdxBasicProfile}
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
