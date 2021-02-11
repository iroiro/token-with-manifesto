import { useCallback, useState } from "react";
import { threadId, walletAddressDidsCollection } from "../utils/textile";
import { Where } from "@textile/hub";

const useWalletAddressDidsModel = (client) => {
  const [walletAddressDids, setWalletAddressDids] = useState(undefined);

  const getWalletAddressDids = useCallback(async () => {
    if (client === undefined) {
      return;
    }
    // TODO get target addresses args and filter with them
    const result = await client.find(threadId, walletAddressDidsCollection, {});
    setWalletAddressDids(result);
  }, [client]);

  const saveWalletAddressDid = useCallback(
    async (walletAddress, did) => {
      if (client === undefined) {
        return;
      }
      const query = new Where("wallet_address")
        .eq(walletAddress)
        .and("did")
        .eq(did);
      const result = await client.find(
        threadId,
        walletAddressDidsCollection,
        query
      );
      if (result.length !== 0) {
        return;
      }
      const model = {
        did,
        wallet_address: walletAddress,
      };
      await client.create(threadId, walletAddressDidsCollection, [model]);
    },
    [client]
  );

  return { walletAddressDids, getWalletAddressDids, saveWalletAddressDid };
};

export default useWalletAddressDidsModel;
