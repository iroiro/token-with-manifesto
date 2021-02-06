import { useEffect, useState } from "react";
import Ceramic from "@ceramicnetwork/http-client";
import { EthereumAuthProvider, ThreeIdConnect } from "3id-connect";
import { IDX } from "@ceramicstudio/idx";

const useCeramic = (ethProvider) => {
  const [ceramic, setCeramic] = useState(undefined);
  const [idx, setIdx] = useState(undefined);

  useEffect(() => {
    const f = async () => {
      if (ethProvider === undefined) {
        setCeramic(undefined);
        setIdx(undefined);
        return;
      }
      const ceramic = new Ceramic("https://ceramic-clay.3boxlabs.com");
      setCeramic(ceramic);

      const addresses = await ethProvider.enable();
      const threeID = new ThreeIdConnect();
      await threeID.connect(
        new EthereumAuthProvider(ethProvider, addresses[0])
      );
      const provider = threeID.getDidProvider();
      await ceramic.setDIDProvider(provider);
      const idx = new IDX({ ceramic });
      setIdx(idx);
    };
    f();
  }, [ethProvider]);

  return { ceramic, idx };
};

export default useCeramic;
