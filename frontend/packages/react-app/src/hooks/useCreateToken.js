import { useCallback, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { hashMessage } from "@ethersproject/hash";
import { Contract } from "@ethersproject/contracts";
import { abis, addresses } from "@project/contracts";

const useCreateToken = (provider) => {
  const [deployedAddress, setDeployedAddress] = useState(undefined);

  const createToken = useCallback(
    async (doc, manifesto) => {
      console.debug(doc, manifesto);
      if (
        provider === undefined ||
        doc === undefined ||
        manifesto === undefined ||
        manifesto.witness_signatures.length !== 3
      ) {
        return;
      }

      const signer = new Web3Provider(provider).getSigner();
      const docId =
        "kjzl6cwe1jw148pz7bxn79l4xdmuc2v288uvnljcr8se561tv7qdnuw1d9kqgor";
      const creatorDid =
        "kjzl6cwe1jw148pz7bxn79l4xdmuc2v288uvnljcr8se561tv7qdnuw1d9kqgor";
      const witnessDid =
        "did:3:kjzl6cwe1jw14a0fwom56w5kgoig5cofmasz1qb7s0jpwh6oi03jvo6kqdnagk2";
      const address = await signer.getAddress();
      const hashedDocId = hashMessage(docId);
      const signature = await signer.signMessage(docId);
      console.debug(hashedDocId, signature);
      const tokenFactory = new Contract(
        addresses.tokenFactory,
        abis.tokenFactory,
        signer
      );

      await tokenFactory
        .createToken(
          "sample token001",
          "SMP",
          10000000000,
          docId,
          "0x536f6014f03009611b9297d6b8c4bfc38d01eb9a0be6a5a82308d6a32ae70381",
          creatorDid,
          [witnessDid, witnessDid, witnessDid],
          [signature, signature, signature],
          [address, address, address]
        )
        .then((transaction) => {
          console.debug(transaction);
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

      // // TODO enable
      // const docId = doc.id.toString();
      // const signer = new Web3Provider(provider).getSigner();
      // const tokenFactory = new Contract(
      //   addresses.tokenFactory,
      //   abis.tokenFactory,
      //   signer
      // );
      // console.debug(
      //   doc.content.token.name,
      //   doc.content.token.symbol,
      //   doc.content.token.totalSupply,
      //   docId,
      //   hashMessage(docId),
      //   manifesto.creator_did,
      //   manifesto.witness_signatures.map((witness) => witness.did),
      //   manifesto.witness_signatures.map((witness) => witness.signature),
      //   manifesto.witness_signatures.map((witness) => witness.wallet_address)
      // );

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
          console.debug(transaction);
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
