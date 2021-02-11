import { useCallback, useState } from "react";
import IpfsHttpClient from "ipfs-http-client";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

const mockTokenInfo = {
  token: {
    name: "A token",
    symbol: "TKN",
    totalSupply: "10000000000",
    decimals: 5,
  },
  manifestoCid: "test cid",
};

const tokenInfoSchema =
  "ceramic://k3y52l7qbv1frxnj7glmjwy8ul705l8aznpv6iddpkpj0vbpn2antv1ugf4yl8b28";

const useTokenBasicInfo = (ceramic, idx, buckets, bucketKey) => {
  const [doc, setDoc] = useState(undefined);
  const [tokenBasicInfo, setTokenBasicInfo] = useState({
    token: {
      name: "",
      symbol: "",
      totalSupply: "",
      decimals: 0,
    },
    manifestoCid: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState(undefined);

  const getTokenBasicInfo = useCallback(
    async (docId) => {
      if (ceramic === undefined || idx === undefined || docId === "") {
        return;
      }
      return await ceramic
        .loadDocument(docId)
        .then((doc) => {
          setDoc(doc);
          setTokenBasicInfo(doc.content);
        })
        .catch((err) => {
          setError(err);
        });
    },
    [ceramic, idx, setDoc, setTokenBasicInfo]
  );

  const saveTokenBasicInfo = useCallback(
    async (manifestoFile, tokenInfoWithManifesto) => {
      if (
        ceramic === undefined ||
        idx === undefined ||
        manifestoFile === undefined
      ) {
        return;
      }
      const result = await buckets.pushPath(
        bucketKey,
        manifestoFile.name,
        manifestoFile
      );
      return await ceramic
        .createDocument("tile", {
          content: {
            ...tokenInfoWithManifesto,
            manifestoCid: result.path.cid.toString(),
          },
          metadata: {
            schema: tokenInfoSchema,
            controllers: [idx.id],
          },
        })
        .then((saved) => {
          setDoc(saved);
          setTokenBasicInfo(saved.content);
        })
        .catch((err) => {
          setError(err);
        });
    },
    [ceramic, idx, buckets, bucketKey, setDoc, setTokenBasicInfo, setError]
  );

  const updateTokenBasicInfo = useCallback(
    async (tokenDoc, deployedAddress) => {
      if (
        ceramic === undefined ||
        idx === undefined ||
        tokenDoc === undefined ||
        deployedAddress === undefined
      ) {
        return;
      }

      await tokenDoc.change({
        content: {
          ...tokenDoc.content,
          token: {
            ...tokenDoc.content.token,
            deployedAddress,
          },
        },
      });
      setDoc(tokenDoc);
      setIsUpdated(true);
    },
    [ceramic, idx, setDoc, setTokenBasicInfo, setError]
  );

  return {
    doc,
    isUpdated,
    tokenBasicInfo,
    setTokenBasicInfo,
    error,
    getTokenBasicInfo,
    saveTokenBasicInfo,
    updateTokenBasicInfo,
  };
};

export default useTokenBasicInfo;
