import { useCallback, useState } from "react";
import { manifestosCollection, threadId } from "../utils/textile";
import { Where } from "@textile/hub";

const mockManifestoModel = {
  manifesto_doc_id: "",
  manifesto_doc_commit_id: "",
  creator_did: "",
  witness_signatures: [
    {
      did: "",
      signature: "",
      wallet_address: "",
    },
  ],
};

const useManifestoModel = (client, idx) => {
  const [manifesto, setManifesto] = useState(undefined);

  const getManifesto = useCallback(
    async (manifestoDocId) => {
      if (
        client === undefined ||
        manifestoDocId === "" ||
        manifestoDocId === undefined
      ) {
        return;
      }
      const query = new Where("manifesto_doc_id").eq(manifestoDocId);
      const result = await client.find(threadId, manifestosCollection, query);
      if (result.length === 0) {
        return;
      }
      setManifesto(result[0]);
    },
    [client]
  );

  const saveManifesto = useCallback(
    async (doc) => {
      if (client === undefined || idx === undefined) {
        return;
      }
      const manifesto = {
        manifesto_doc_id: doc.id.toString(),
        manifesto_doc_commit_id: doc.commitId.commit.toString(),
        creator_did: idx.id,
        witness_signatures: [],
      };
      await client.create(threadId, manifestosCollection, [manifesto]);
      setManifesto(manifesto);
    },
    [client, idx]
  );

  return { manifesto, getManifesto, saveManifesto };
};

export default useManifestoModel;
