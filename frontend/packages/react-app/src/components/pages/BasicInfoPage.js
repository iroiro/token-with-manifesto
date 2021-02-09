import * as React from "react";
import { Main } from "../index";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useCeramic from "../../hooks/useCeramic";
import CommonHeader from "../organisms/CommonHeader";
import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Client } from "@textile/hub";
import { manifestosCollection, threadId } from "../../utils/textile";
import useTokenBasicInfo from "../../hooks/useTokenBasicInfo";
import useIdxBasicProfile from "../../hooks/useIdxBasicProfile";

function BasicInfoPage() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const { ceramic, idx } = useCeramic(provider);
  const { name, setName, imageURL, saveIdxBasicProfile } = useIdxBasicProfile(
    idx
  );
  const [tokenBasicInfo, setTokenBasicInfo] = useState({
    token: {
      name: "",
      symbol: "",
      totalSupply: "",
      decimals: 0,
    },
    manifestoCid: "",
  });
  const [imageFile, setImageFile] = useState(undefined);
  const [manifestoFile, setManifestoFile] = useState(undefined);
  const { doc, error, saveTokenBasicInfo } = useTokenBasicInfo(ceramic, idx);

  // TODO just teset. remove
  useEffect(() => {
    const f = async () => {
      const client = await Client.withKeyInfo({
        key: process.env.REACT_APP_THREADDB_KEY,
        secret: process.env.REACT_APP_THREADDB_SECRET,
      });
      console.debug(await client.find(threadId, manifestosCollection, {}));
    };
    f();
  }, []);

  useEffect(() => {
    const f = async () => {
      if (doc === undefined || error !== undefined) {
        return;
      }
      const manifesto = {
        manifesto_doc_id: doc.id.toString(),
        manifesto_doc_commit_id: doc.commitId.commit.toString(),
        creator_did: idx.id,
        witness_signatures: [],
      };
      const client = await Client.withKeyInfo({
        key: process.env.REACT_APP_THREADDB_KEY,
        secret: process.env.REACT_APP_THREADDB_SECRET,
      });
      await client.create(threadId, manifestosCollection, [manifesto]);
    };
    f();
  }, [doc]);

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
        <TextField value={name} onChange={(e) => setName(e.target.value)} />
        <p>icon image</p>
        {imageFile !== undefined ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="user image"
            width="100"
            height="100"
          />
        ) : (
          imageURL !== undefined && (
            <img src={imageURL} alt="user image" width="100" height="100" />
          )
        )}
        <Button variant="contained" component="label">
          Select Image
          <input
            type="file"
            accept="image/jpeg"
            hidden
            onChange={(event) => setImageFile(event.target.files[0])}
          />
        </Button>
        <Button
          onClick={() => saveIdxBasicProfile(name, imageFile)}
          disabled={idx === undefined}
        >
          Save Profile
        </Button>
        <h2>Fill in token info</h2>
        <TextField
          value={tokenBasicInfo.token.name}
          onChange={(e) =>
            setTokenBasicInfo({
              ...tokenBasicInfo,
              token: {
                ...tokenBasicInfo.token,
                name: e.target.value,
              },
            })
          }
        />
        <TextField
          value={tokenBasicInfo.token.symbol}
          onChange={(e) =>
            setTokenBasicInfo({
              ...tokenBasicInfo,
              token: {
                ...tokenBasicInfo.token,
                symbol: e.target.value,
              },
            })
          }
        />
        <TextField
          value={tokenBasicInfo.token.totalSupply}
          onChange={(e) =>
            setTokenBasicInfo({
              ...tokenBasicInfo,
              token: {
                ...tokenBasicInfo.token,
                totalSupply: e.target.value,
              },
            })
          }
        />
        <TextField
          value={tokenBasicInfo.token.decimals}
          onChange={(e) => {
            const decimals = Number.parseInt(e.target.value);
            if (Number.isNaN(decimals)) {
              return;
            }
            setTokenBasicInfo({
              ...tokenBasicInfo,
              token: {
                ...tokenBasicInfo.token,
                decimals,
              },
            });
          }}
        />
        <h2>Select manifest for token</h2>
        <Button variant="contained" component="label">
          Select Manifest
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event) => setManifestoFile(event.target.files)}
          />
        </Button>
        <Button
          onClick={() => saveTokenBasicInfo(manifestoFile, tokenBasicInfo)}
          disabled={
            ceramic === undefined ||
            idx === undefined ||
            manifestoFile === undefined
          }
        >
          Save
        </Button>
      </Main>
    </div>
  );
}

export default BasicInfoPage;
