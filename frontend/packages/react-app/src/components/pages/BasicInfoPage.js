import * as React from "react";
import { Main } from "../index";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useCeramic from "../../hooks/useCeramic";
import CommonHeader from "../organisms/CommonHeader";
import useGetIdxBasicProfile from "../../hooks/useGetIdxBasicProfile";
import { Button } from "@material-ui/core";
import { useState } from "react";
import useSaveIdxBasicProfile from "../../hooks/useSaveIdxBasicProfile";

function BasicInfoPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const { name, image, imageURL } = useGetIdxBasicProfile(idx);
  const [tokenBasicInfo, setTokenBasicInfo] = useState({
    token: {
      name: "",
      symbol: "",
      totalSupply: "",
      decimals: "",
    },
    manifestoCid: "",
  });
  const saveIdxBasicProfile = useSaveIdxBasicProfile(idx, name, image);

  // TODO Integrate with template
  return (
    <div>
      <CommonHeader
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <Main>
        <h2>Fill in your info</h2>
        basic info page
        <p>{name}</p>
        {imageURL !== undefined && (
          <img src={imageURL} alt="user image" width="100" height="100" />
        )}
        <Button
          onClick={() => saveIdxBasicProfile()}
          disabled={idx === undefined}
        >
          Save Profile
        </Button>
        <h2>Fill in token info</h2>
        <h2>Select manifest for token</h2>
        <Button>Select Manifest</Button>
        <Button>Save</Button>
      </Main>
    </div>
  );
}

export default BasicInfoPage;
