import { useEffect, useState } from "react";
import { Client } from "@textile/hub";

const useThreadDB = () => {
  const [client, setClient] = useState(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const f = async () => {
      const client = await Client.withKeyInfo({
        key: process.env.REACT_APP_THREADDB_KEY,
        secret: process.env.REACT_APP_THREADDB_SECRET,
      });
      setClient(client);
    };
    f();
  }, []);

  return { client, isInitialized };
};

export default useThreadDB;
