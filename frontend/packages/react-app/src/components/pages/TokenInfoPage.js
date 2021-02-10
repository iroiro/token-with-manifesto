import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { TokenInfopageTemplate } from "../templates/TokenInfoPageTemplate";
import { useParams } from "react-router-dom";
import useCeramic from "../../hooks/useCeramic";
import useThreadDB from "../../hooks/useThreadDB";
import useManifestoModel from "../../hooks/useManifestoModel";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";
import GET_TOKEN from "../../graphql/subgraph";
import { useLazyQuery } from "@apollo/react-hooks";

const initialState = {
  name: "",
  imageUrl: "",
};
const initialArray = [initialState, initialState, initialState];
const imageURLPrefix = "https://gateway.pinata.cloud/ipfs/";

function TokenInfoPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { manifestoDocId } = useParams();
  const { ceramic, idx } = useCeramic(provider);
  const { client, isInitialized } = useThreadDB();
  const { manifesto, getManifesto } = useManifestoModel(client);
  const { tokenBasicInfo, getTokenBasicInfo } = useTokenBasicInfo(ceramic, idx);
  const [creatorInfo, setCreatorInfo] = useState(initialState);
  const [witnessArray, setWitnessArray] = useState(initialArray);
  const [getToken, { data: token }] = useLazyQuery(GET_TOKEN);

  useEffect(() => {
    if (
      tokenBasicInfo === undefined ||
      tokenBasicInfo.token.deployedAddress === undefined
    ) {
      return;
    }
    getToken({
      variables: {
        id: tokenBasicInfo.token.deployedAddress.toLowerCase(),
      },
    });
  }, [tokenBasicInfo, getToken]);

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
      if (
        creatorBasicInfo.image === undefined ||
        creatorBasicInfo.image.original === undefined
      ) {
        setCreatorInfo({
          name: creatorBasicInfo.name,
          imageUrl: "",
        });
      }
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
          if (
            witnessInfo.image === undefined ||
            witnessInfo.image.original === undefined
          ) {
            return {
              name: witnessInfo.name,
              imageUrl: "",
            };
          }
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
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
      tokenInfo={
        token !== undefined && token.token === null ? tokenBasicInfo : token
      }
      creatorInfo={creatorInfo}
      witness={witnessArray}
      handleReadManifestoButtonClick={handleReadManifestoButtonClick}
    />
  );
}

export default TokenInfoPage;
