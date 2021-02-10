import { useCallback, useEffect, useState } from "react";
import IpfsHttpClient from "ipfs-http-client";

const infura = { host: "ipfs.infura.io", port: 5001, protocol: "https" };
const ipfs = IpfsHttpClient(infura);

const imageURLPrefix = "https://gateway.pinata.cloud/ipfs/";

const useIdxBasicProfile = (idx) => {
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
      console.log(newName, newImageFile);
      if (idx === undefined) {
        return false;
      }
      const profile = {};
      if (newName !== undefined) {
        profile.name = newName;
      }
      if (newImageFile !== undefined) {
        // TODO: pin file
        const { path } = await ipfs.add(newImageFile);
        console.log(path);
        console.debug(path);
        // TODO: get width and height
        // TODO: make mime type variable
        const original = {
          src: `ipfs://${path}`,
          mimeType: "image/jpeg",
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
    [idx]
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
