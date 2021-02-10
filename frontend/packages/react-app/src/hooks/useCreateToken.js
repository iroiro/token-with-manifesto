import { useCallback, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { hashMessage } from "@ethersproject/hash";
import { Contract } from "@ethersproject/contracts";
import { abis, addresses } from "@project/contracts";

const useCreateToken = (provider) => {
  const [deployedAddress, setDeployedAddress] = useState(undefined);

  const createToken = useCallback(
    async (doc, manifesto) => {
      if (
        provider === undefined ||
        doc === undefined ||
        manifesto === undefined ||
        manifesto.witness_signatures.length !== 3
      ) {
        return;
      }
      const docId = doc.id.toString();
      const signer = new Web3Provider(provider).getSigner();
      const tokenFactory = new Contract(
        addresses.tokenFactory,
        abis.tokenFactory,
        signer
      );

      await tokenFactory
        .createToken(
          doc.content.token.name,
          doc.content.token.symbol,
          doc.content.token.totalSupply,
          docId,
          hashMessage(docId),
          manifesto.creator_did,
          manifesto.witness_signatures.map((witness) => witness.did),
          manifesto.witness_signatures.map((witness) => witness.signature),
          manifesto.witness_signatures.map((witness) => witness.wallet_address)
        )
        .then((transaction) => {
          transaction
            .wait()
            .then((receipt) => {
              const deployedAddress = receipt.logs[0].address;
              setDeployedAddress(deployedAddress);
              return deployedAddress;
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [provider]
  );

  return { deployedAddress, createToken };
};

export default useCreateToken;
