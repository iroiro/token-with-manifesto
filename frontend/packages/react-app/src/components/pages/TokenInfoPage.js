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
import useWalletAddressDidsModel from "../../hooks/useWalletAddressDidsModel";

const initialState = {
  name: "",
  imageUrl: "",
};
const initialArray = [initialState, initialState, initialState];
const imageURLPrefix = "https://gateway.pinata.cloud/ipfs/";

function createData(name, balance) {
  return { name, balance };
}

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
  const { walletAddressDids, getWalletAddressDids } = useWalletAddressDidsModel(
    client
  );
  const [accountBalances, setAccountBalances] = useState([]);
  const [rows, setRows] = useState([]);
  const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true);
  const [progress, setProgress] = useState(0);

  const [fetchTokenInfo, setFetchTokenInfo] = useState(false);
  const [fetchManifesto, setFetchManifesto] = useState(false);
  const [fetchCreatorInfo, setFetchCreatorInfo] = useState(false);
  const [fetchWitness, setFetchWitness] = useState(false);
  const [fetchTokenHolders, setFetchTokenHolders] = useState(false);

  useEffect(() => {
    const f = async () => {
      if (
        idx === undefined ||
        token === undefined ||
        token.token === null ||
        walletAddressDids === undefined
      ) {
        return;
      }
      const accountBalances = await Promise.all(
        token.token.accountTokens
          .map((accountToken) => {
            const walletAddress = accountToken.id.split("-")[0];
            const balance = accountToken.balance;
            const did = walletAddressDids.find((walletAddressDid) => {
              return (
                walletAddressDid.wallet_address.toLowerCase() ===
                walletAddress.toLowerCase()
              );
            });

            return { walletAddress, balance, did };
          })
          .filter((accountBalance) => {
            return (
              accountBalance.walletAddress !==
              "0x0000000000000000000000000000000000000000"
            );
          })
          .map(async (accountBalanceWithDid) => {
            const basicProfile =
              accountBalanceWithDid.did === undefined
                ? { name: "anonymous" }
                : await idx.get("basicProfile", accountBalanceWithDid.did.did);
            return {
              ...accountBalanceWithDid,
              basicProfile,
            };
          })
      );
      setAccountBalances(accountBalances);
    };
    f();
  }, [token, walletAddressDids, idx]);

  useEffect(() => {
    if (accountBalances.length === 0) {
      return;
    }

    const rows = accountBalances.map((accountBalance) => {
      return createData(
        accountBalance.basicProfile.name,
        accountBalance.balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    });

    setRows(rows);
    setFetchTokenHolders(true);
  }, [accountBalances]);

  useEffect(() => {
    const f = async () => {
      if (client === undefined) {
        return;
      }
      await getWalletAddressDids();
    };
    f();
  }, [client]);

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
    if (tokenBasicInfo === undefined || tokenBasicInfo.manifestoCid === "") {
      return;
    }
    setIsReadButtonDisabled(false);
    setFetchManifesto(true);
  }, [tokenBasicInfo]);

  useEffect(() => {
    if (token === undefined || token.data === null) {
      return;
    }
    setFetchTokenInfo(true);
  }, [token]);

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
      setFetchCreatorInfo(true);
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

    f().then((result) => {
      setWitnessArray(result);
      setFetchWitness(true);
    });
  }, [idx, manifesto]);

  useEffect(() => {
    if (
      !fetchCreatorInfo &&
      !fetchManifesto &&
      !fetchTokenHolders &&
      !fetchTokenInfo &&
      !fetchWitness
    ) {
      return;
    }
    const fetchStates = [
      fetchCreatorInfo,
      fetchManifesto,
      fetchTokenHolders,
      fetchTokenInfo,
      fetchWitness,
    ];

    const progressPer = fetchStates.filter((fetchState) => fetchState === true);
    setProgress(progressPer.length * 20);
  }, [
    fetchCreatorInfo,
    fetchManifesto,
    fetchTokenHolders,
    fetchTokenInfo,
    fetchWitness,
  ]);

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
      rows={rows}
      isReadButtonDisabled={isReadButtonDisabled}
      progress={progress}
    />
  );
}

export default TokenInfoPage;
