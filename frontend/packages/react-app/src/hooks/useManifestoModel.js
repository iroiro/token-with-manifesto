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

const useManifestoModel = (client) => {
  const [manifesto, setManifesto] = useState(undefined);

  const getManifesto = useCallback(
    async (manifestoDocId) => {
      if (client === undefined || manifestoDocId === "") {
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

  return { manifesto, getManifesto };
};

export default useManifestoModel;