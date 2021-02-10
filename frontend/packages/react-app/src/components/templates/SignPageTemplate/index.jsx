import React, { useState } from "react";
import styled from "styled-components";
import { IconTitle } from "../../molecules/IconTitle";
import { Header } from "../../organisms/Header";
import { Frame, StyledContainer } from "../../util/style/commonStyle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { TokenInfo } from "../../molecules/TokenInfo";
import { EditProfile } from "../../molecules/EditProfile";
import CommonHeader from "../../organisms/CommonHeader";

const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 16px;
`;

export const SignPageTemplate = ({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  tokenBasicInfo,
  userName,
  setName,
  image,
  setImage,
  imageURL,
  setImageURL,
  manifestoDocId,
  setManifestoDocId,
  manifesto,
  getManifesto,
  saveIdxBasicProfile,
  signManifestoAndSave,
  isSignedAndSaved,
}) => {
  const handleImageUpload = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageURL(imageURL);
  };

  return (
    <>
      <Header
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <StyledContainer maxWidth="sm">
        <div>
          <IconTitle icon="✍️" title="Sign Manifesto" />
          <Frame variant="outlined">
            <Typography variant="h5" component="h2" style={{ marginBottom: 8 }}>
              Manifesto
            </Typography>
            <StyledInput
              label="Input Manifesto ID"
              value={manifestoDocId}
              onChange={(e) => setManifestoDocId(e.target.value)}
            />
            <div style={{ marginTop: 16 }}>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                style={{ minWidth: 240, width: "100%" }}
                onClick={() => getManifesto(manifestoDocId)}
              >
                Download Manifesto
              </Button>
            </div>
          </Frame>
          {manifesto !== undefined && (
            <>
              <Frame variant="outlined">
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ marginBottom: 8 }}
                >
                  Token Info
                </Typography>
                <TokenInfo
                  tokenName={tokenBasicInfo.token.name}
                  symbol={tokenBasicInfo.token.symbol}
                  totalSupply={tokenBasicInfo.token.totalSupply}
                  decimals={tokenBasicInfo.token.decimals}
                />
              </Frame>
              <Frame variant="outlined">
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ marginBottom: 8 }}
                >
                  Fill in your info
                </Typography>
                <EditProfile
                  name={userName}
                  onNameChange={(e) => setName(e.target.value)}
                  imageURL={imageURL}
                  handleImageUpload={handleImageUpload}
                  onUpdateButtonClick={() =>
                    saveIdxBasicProfile(userName, image)
                  }
                />
              </Frame>
              <div style={{ maxWidth: 416, margin: "52px auto 32px" }}>
                <Typography
                  style={{
                    fontWeight: 500,
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                >
                  Sign manifesto and send back to Creator
                </Typography>
                {/* TODO: Conditioning when Button becomes active */}
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{ minWidth: 240, width: "100%" }}
                  disabled={
                    isSignedAndSaved || userName === "" || imageURL === ""
                  }
                  onClick={() =>
                    signManifestoAndSave(manifesto, manifestoDocId)
                  }
                >
                  {isSignedAndSaved ? "Signed it!" : "Sign"}
                </Button>
              </div>
            </>
          )}
        </div>
      </StyledContainer>
    </>
  );
};
