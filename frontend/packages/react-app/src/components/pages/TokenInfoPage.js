import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { TokenInfopageTemplate } from "../templates/TokenInfoPageTemplate";
import { useParams } from "react-router-dom";
import useCeramic from "../../hooks/useCeramic";
import useThreadDB from "../../hooks/useThreadDB";
import useManifestoModel from "../../hooks/useManifestoModel";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";

const initialState = {
  name: "",
  imageUrl: "",
};
const initialArray = [initialState, initialState, initialState];
const imageURLPrefix = "https://gateway.pinata.cloud/ipfs/";

function TokenInfoPage() {
  const [provider] = useWeb3Modal();
  const { manifestoDocId } = useParams();
  const { ceramic, idx } = useCeramic(provider);
  const { client, isInitialized } = useThreadDB();
  const { manifesto, getManifesto } = useManifestoModel(client);
  const { tokenBasicInfo, getTokenBasicInfo } = useTokenBasicInfo(ceramic, idx);
  const [creatorInfo, setCreatorInfo] = useState(initialState);
  const [witnessArray, setWitnessArray] = useState(initialArray);

  useEffect(() => {
    getTokenBasicInfo(manifestoDocId);
    getManifesto(manifestoDocId);
  }, [manifestoDocId, idx]);

  useEffect(() => {
    if (idx === undefined || manifesto === undefined) {
      return;
    }
    const f = async () => {
      const creatorBasicInfo = await idx.get(
        "basicProfile",
        manifesto.creator_did
      );
      setCreatorInfo({
        name: creatorBasicInfo.name,
        imageUrl:
          imageURLPrefix + creatorBasicInfo.image.original.src.substr(7),
      });
    };
    f();
  }, [idx, manifesto]);

  useEffect(() => {
    if (idx === undefined || manifesto === undefined) {
      return;
    }
    const f = async () => {
      const witnessInfoArray = manifesto.witness_signatures.map(
        async (signature) => {
          const witnessInfo = await idx.get("basicProfile", signature.did);
          return {
            name: witnessInfo.name,
            imageUrl: imageURLPrefix + witnessInfo.image.original.src.substr(7),
          };
        }
      );
      return await Promise.all(witnessInfoArray);
    };

    f().then((result) => setWitnessArray(result));
  }, [idx, manifesto]);

  const handleReadManifestoButtonClick = useCallback(() => {
    window.open(
      `https://gateway.pinata.cloud/ipfs/${tokenBasicInfo.manifestoCid}`,
      "_blank"
    );
  }, [tokenBasicInfo]);

  return (
    <TokenInfopageTemplate
      tokenInfo={tokenBasicInfo}
      creatorInfo={creatorInfo}
      witness={witnessArray}
      handleReadManifestoButtonClick={handleReadManifestoButtonClick}
    />
  );
}

export default TokenInfoPage;
