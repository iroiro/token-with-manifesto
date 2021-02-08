import { useCallback } from "react";

const useSaveIdxBasicProfile = (idx, name, image) =>
  useCallback(async () => {
    if (idx === undefined) {
      return false;
    }
    const profile = {};
    if (name !== undefined) {
      profile.name = name;
    }
    if (image !== undefined) {
      profile.image.original = image;
    }

    await idx.merge("basicProfile", profile);
    return true;
  }, [idx, name, image]);

export default useSaveIdxBasicProfile;
