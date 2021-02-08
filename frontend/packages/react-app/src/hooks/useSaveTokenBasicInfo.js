import { useCallback, useEffect, useState } from "react";

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
  "ceramic://k3y52l7qbv1frxs11yw808uledicr7q3aq1vjihd7m2w2mo66f8w5z200pwli0dts";

const useSaveTokenBasicInfo = (ceramic, idx) => {
  const [doc, setDoc] = useState(undefined);
  const [error, setError] = useState(undefined);

  const saveTokenBasicInfo = useCallback(
    async (tokenInfoWithManifesto) => {
      if (ceramic === undefined || idx === undefined) {
        return;
      }
      return await ceramic
        .createDocument("tile", {
          content: tokenInfoWithManifesto,
          metadata: {
            schema: tokenInfoSchema,
            controllers: [idx.id],
          },
        })
        .then((saved) => {
          setDoc(saved);
        })
        .catch((err) => {
          setError(err);
        });
    },
    [ceramic, idx, setDoc, setError]
  );

  return { doc, error, saveTokenBasicInfo };
};

export default useSaveTokenBasicInfo;
