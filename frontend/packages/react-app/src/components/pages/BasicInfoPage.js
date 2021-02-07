import * as React from "react";
import { Main } from "../index";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useCeramic from "../../hooks/useCeramic";
import CommonHeader from "../organisms/CommonHeader";
import { useEffect } from "react";
import { testThreadDB } from "../../utils/textile";

function BasicInfoPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  console.log(ceramic, idx);

  useEffect(() => {
    testThreadDB();
  }, []);

  useEffect(() => {
    if (ceramic === undefined || idx === undefined) {
      return;
    }
    const f = async () => {
      const savedDoc = await ceramic.createDocument("tile", {
        content: { from: "frontend" },
        metadata: { controllers: [idx.id] },
      });
      console.debug(savedDoc);
      const fetchedDoc = await ceramic.loadDocument(savedDoc.id);
      console.debug(fetchedDoc);
    };
    f();
  }, [ceramic, idx]);

  return (
    <div>
      <CommonHeader
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <Main>basic info page</Main>
    </div>
  );
}

export default BasicInfoPage;
