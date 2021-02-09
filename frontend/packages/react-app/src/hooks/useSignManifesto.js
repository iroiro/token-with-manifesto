import { useCallback, useState } from "react";
import { manifestosCollection, threadId } from "../utils/textile";
import Web3 from "web3";

const useSignManifesto = (provider, ceramic, idx, client) => {
  const [manifesto, setManifesto] = useState(undefined);
  const [isSignedAndSaved, setIsSignedAndSaved] = useState(false);
  const [error, setError] = useState(undefined);

  const signManifestoAndSave = useCallback(
    async (manifesto, manifestoDocId) => {
      if (
        provider === undefined ||
        ceramic === undefined ||
        idx === undefined ||
        client === undefined ||
        manifestoDocId === ""
      ) {
        return;
      }

      const web3 = new Web3(provider);
      const account = (await web3.eth.getAccounts())[0];
      // TODO sign for manifesto doc id, timestamp and wallet address
      const mockSignature = "mock signature";

      const newWitnessSignature = {
        did: idx.id,
        signature: mockSignature,
        wallet_address: account,
      };

      const signaturesExcludedSigner = manifesto.witness_signatures.filter(
        (witnessSignature) => {
          return (
            newWitnessSignature.did !== witnessSignature.did &&
            newWitnessSignature.wallet_address !==
              witnessSignature.wallet_address
          );
        }
      );
      const updatedManifesto = {
        ...manifesto,
        witness_signatures: [...signaturesExcludedSigner, newWitnessSignature],
      };
      setManifesto(updatedManifesto);

      await client
        .save(threadId, manifestosCollection, [updatedManifesto])
        .then(() => {
          setIsSignedAndSaved(true);
        })
        .catch((error) => {
          setError(error);
        });
    },
    [provider, ceramic, idx, client]
  );

  return { manifesto, isSignedAndSaved, error, signManifestoAndSave };
};

export default useSignManifesto;
