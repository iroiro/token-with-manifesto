import { useEffect, useState } from "react";

const imageURLPrefix = "https://gateway.pinata.cloud/ipfs/";

const useGetIdxBasicProfile = (idx) => {
  const [name, setName] = useState(undefined);
  const [imageURL, setImageURL] = useState(undefined);

  useEffect(() => {
    const f = async () => {
      if (idx === undefined) {
        return;
      }
      const basicProfile = await idx.get("basicProfile");
      if (basicProfile === null) {
        setName(undefined);
        setImageURL(undefined);
        return;
      }
      const name = basicProfile.name;
      setName(name);
      if (
        basicProfile.image === undefined ||
        basicProfile.image.original === undefined
      ) {
        setImageURL(undefined);
        return;
      }
      console.log(basicProfile.image.original);
      const cid = basicProfile.image.original.src.substr(7); // removing "ipfs://"
      setImageURL(imageURLPrefix + cid);
    };
    f();
  }, [idx]);

  return { name, imageURL };
};

export default useGetIdxBasicProfile;
