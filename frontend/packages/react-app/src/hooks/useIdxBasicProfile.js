import { useCallback, useEffect, useState } from "react";
import IpfsHttpClient from "ipfs-http-client";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

const imageURLPrefix = "https://gateway.pinata.cloud/ipfs/";

const useIdxBasicProfile = (idx, buckets, bucketKey) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);
  const [imageURL, setImageURL] = useState(undefined);

  useEffect(() => {
    const f = async () => {
      if (idx === undefined) {
        return;
      }
      const basicProfile = await idx.get("basicProfile");
      if (basicProfile === null) {
        setName("");
        setImage(undefined);
        setImageURL(undefined);
        return;
      }
      setName(basicProfile.name === undefined ? "" : basicProfile.name);
      if (
        basicProfile.image === undefined ||
        basicProfile.image.original === undefined
      ) {
        setImage(undefined);
        setImageURL(undefined);
        return;
      }
      const cid = basicProfile.image.original.src.substr(7); // removing "ipfs://"
      setImage(basicProfile.image.original);
      setImageURL(imageURLPrefix + cid);
    };
    f();
  }, [idx]);

  const saveIdxBasicProfile = useCallback(
    async (newName, newImageFile) => {
      if (idx === undefined) {
        return false;
      }
      const profile = {};
      if (newName !== undefined) {
        profile.name = newName;
      }
      if (newImageFile !== undefined) {
        const result = await buckets.pushPath(
          bucketKey,
          newImageFile.name,
          newImageFile
        );
        // TODO: get width and height
        const original = {
          src: `ipfs://${result.path.cid.toString()}`,
          mimeType: newImageFile.type,
          width: 100,
          height: 100,
        };
        profile.image = {
          ...image,
          original,
        };
      }

      await idx.merge("basicProfile", profile);
      return true;
    },
    [idx, buckets, bucketKey]
  );

  return {
    name,
    setName,
    image,
    setImage,
    imageURL,
    setImageURL,
    saveIdxBasicProfile,
  };
};

export default useIdxBasicProfile;
