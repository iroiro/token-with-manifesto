import { Client, ThreadID, Where } from "@textile/hub";

// TODO move
export const manifestosSchema = {
  title: "Manifestos",
  type: "object",
  required: [
    "manifesto_doc_id",
    "manifesto_doc_commit_id",
    "creator_did",
    "witness_signatures",
  ],
  properties: {
    _id: { type: "string" },
    manifesto_doc_id: {
      type: "string",
    },
    manifesto_doc_commit_id: {
      type: "string",
    },
    creator_did: {
      type: "string",
    },
    witness_signatures: {
      type: "array",
      items: {
        type: "object",
        required: ["did", "signature", "wallet_address"],
        properties: {
          did: {
            type: "string",
          },
          signature: {
            type: "string",
          },
          wallet_address: {
            type: "string",
          },
        },
      },
    },
  },
};

export const walletAddressDidsSchema = {
  title: "Wallet address and DID relationship",
  type: "object",
  required: ["wallet_address", "did"],
  properties: {
    _id: { type: "string" },
    wallet_address: {
      type: "string",
    },
    did: {
      type: "string",
    },
  },
};

export const mockManifesto = {
  manifesto_doc_id: "[manifesto dpc id]",
  manifesto_doc_commit_id: "",
  creator_did: "[creator_did]",
  witness_signatures: [
    {
      did: "[did]",
      signature: "[signature]",
      wallet_address: "[wallet address]",
    },
  ],
};

export const manifestosCollection = "Manifestos";

export const walletAddressDidsCollection = "WalletAddressDids";

export const threadId = ThreadID.fromString(
  "bafkrry3cmc7c3pqiddusuookcsjhqhz33eocniwtfncifef4mxgo4oy"
);

// TODO split and add as custom hooks
export const testThreadDB = async () => {
  const client = await Client.withKeyInfo({
    key: process.env.REACT_APP_THREADDB_KEY,
    secret: process.env.REACT_APP_THREADDB_SECRET,
  });

  // await client.deleteCollection(threadId, manifestosCollection);

  // await client
  //   .newCollection(threadId, {
  //     name: walletAddressDidsCollection,
  //     schema: walletAddressDidsSchema,
  //   })
  //   .then((result) => {
  //     console.debug("result", result);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  //
  // console.debug(await client.listCollections(threadId));

  // client.deleteDB(threadId)
};
