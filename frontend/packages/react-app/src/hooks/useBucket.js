import { useEffect, useState } from "react";
import { Buckets } from "@textile/hub";

const useBuckets = () => {
  const [buckets, setBuckets] = useState(undefined);
  const [bucketKey, setBucketKey] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const f = async () => {
      const buckets = await Buckets.withKeyInfo({
        key: process.env.REACT_APP_THREADDB_KEY,
        secret: process.env.REACT_APP_THREADDB_SECRET,
      });
      setBuckets(buckets);
      const result = await buckets.open("token-with-manifesto");
      if (!result.root) {
        setError(new Error("Failed to open bucket"));
      }
      setBucketKey(result.root.key);
    };
    f();
  }, []);

  return { buckets, bucketKey, error, isInitialized };
};

export default useBuckets;
