import React, { useState } from "react";
import styled from "styled-components";
import { IconTitle } from "../../molecules/IconTitle";
import { Header } from "../../organisms/Header";
import { Frame, StyledContainer } from "../../util/style/commonStyle";
import Typography from "@material-ui/core/Typography";
import { StyledNumber } from "../../molecules/StyledNumber";
import { EditProfile } from "../../molecules/EditProfile";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 16px;
`;

const Preview = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const SignaturesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 32px;
`;

const SignaturesNumber = styled.div`
  font-size: 3.437rem;
  font-weight: 500;
`;

const DenominatorNumber = styled.div`
  font-size: 1.375rem;
  font-weight: 500;
`;

export const CreateTokenPageTemplate = ({
  createToken,
  doc,
  image,
  imageFile,
  manifesto,
  manifestoFile,
  name,
  pdfName,
  isSaved,
  setIsSaved,
  saveTokenBasicInfo,
  saveIdxBasicProfile,
  setImage,
  setName,
  setImageFile,
  setManifestoFile,
  setPdfName,
  setTokenBasicInfo,
  tokenBasicInfo,
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) => {
  const handleImageUpload = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setImage(image);
    setImageFile(e.target.files[0]);
  };

  // TODO update
  const checkSave = !(name !== "" && image !== "" && pdfName !== "");

  return (
    <>
      <Header
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <StyledContainer maxWidth="sm">
        <div>
          <IconTitle icon="📝" title="Create Token with Manifesto" />
          <Frame variant="outlined">
            <StyledNumber number="1">
              <Typography
                variant="h5"
                component="h2"
                style={{ marginBottom: 8 }}
              >
                Fill in your info
              </Typography>
            </StyledNumber>
            <EditProfile
              name={name}
              onNameChange={(e) => setName(e.target.value)}
              image={image}
              handleImageUpload={handleImageUpload}
              onUpdateButtonClick={() => saveIdxBasicProfile(name, imageFile)}
            />
          </Frame>
          <Frame variant="outlined">
            <StyledNumber number="2">
              <Typography
                variant="h5"
                component="h2"
                style={{ marginBottom: 8 }}
              >
                Fill in token info
              </Typography>
            </StyledNumber>
            <StyledInput
              label="Name"
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
              disabled={isSaved}
            />
            <StyledInput
              label="Symbol"
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
              disabled={isSaved}
            />
            <StyledInput
              label="TotalSupply"
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
              disabled={isSaved}
            />
            <StyledInput
              label="Decimals"
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
              disabled={isSaved}
            />
          </Frame>
          <Frame variant="outlined">
            <StyledNumber number="3">
              <Typography
                variant="h5"
                component="h2"
                style={{ marginBottom: 8 }}
              >
                Select manifesto for token
              </Typography>
              <Typography
                variant="caption"
                style={{ position: "absolute", bottom: -16, color: "#7E7E7E" }}
              >
                *pdf only
              </Typography>
            </StyledNumber>
            <div style={{ paddingTop: 18 }}>
              {pdfName !== "" && (
                <Preview>
                  <Typography style={{ fontWeight: 500 }} component="span">
                    {pdfName}
                  </Typography>
                </Preview>
              )}
              <input
                accept="application/pdf"
                id="button-pdf-file"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  setManifestoFile(event.target.files[0]);
                  setPdfName(event.target.files[0].name);
                }}
                disabled={isSaved}
              />
              <label htmlFor="button-pdf-file">
                <Button
                  variant="outlined"
                  color="primary"
                  disableElevation
                  component="span"
                  style={{
                    minWidth: 240,
                    width: "100%",
                    display: isSaved ? "none" : "block",
                  }}
                  disabled={isSaved}
                >
                  Select Manifesto
                </Button>
              </label>
            </div>
          </Frame>
          {!isSaved && (
            <div style={{ maxWidth: 416, margin: "32px auto" }}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                style={{
                  minWidth: 240,
                  width: "100%",
                }}
                onClick={() => {
                  saveTokenBasicInfo(manifestoFile, tokenBasicInfo);
                  setIsSaved(true);
                }}
                disabled={checkSave}
              >
                Save
              </Button>
            </div>
          )}
          {doc !== undefined && manifesto !== undefined && (
            <>
              <Frame variant="outlined">
                <StyledNumber number="4">
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ marginBottom: 8 }}
                  >
                    Share your manifesto
                    <br /> to 3 witness
                  </Typography>
                </StyledNumber>
                <div style={{ padding: "8px 8px 28px" }}>
                  <Typography style={{ overflowWrap: "break-word" }}>
                    {doc.id.toString()}
                  </Typography>
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  disableElevation
                  style={{
                    minWidth: 240,
                    width: "100%",
                  }}
                >
                  Copy
                </Button>
              </Frame>
              <div style={{ maxWidth: 416, margin: "32px auto" }}>
                <div>
                  <Typography
                    style={{ textAlign: "center", marginBottom: 16 }}
                    variant="h5"
                  >
                    Number of signatures
                  </Typography>
                  <SignaturesWrapper>
                    <SignaturesNumber>
                      {manifesto.witness_signatures.length}
                    </SignaturesNumber>
                    <DenominatorNumber>/ 3</DenominatorNumber>
                  </SignaturesWrapper>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{
                    minWidth: 240,
                    width: "100%",
                  }}
                  onClick={() => createToken(doc, manifesto)}
                  disabled={manifesto.witness_signatures.length !== 3}
                >
                  Create Token with Manifesto
                </Button>
              </div>
            </>
          )}
        </div>
      </StyledContainer>
    </>
  );
};
