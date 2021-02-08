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

const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 16px;
`;

export const SignPageTemplate = ({ value }) => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [textValue, setTextValue] = useState("");
  // TODO: Move to page
  const [name, setName] = useState(value.userInfo.name);
  const [image, setImage] = useState(value.userInfo.iconImageUrl);
  const [isSigned, setIsSigned] = useState(value.isSigned);

  const handleDownloadButtonClick = () => {
    setIsDisplay(true);
  };

  const handleImageUpload = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setImage(image);
  };

  const handleSignButtonClick = () => {
    setIsSigned(true);
  };

  return (
    <>
      <Header />
      <StyledContainer maxWidth="sm">
        <div>
          <IconTitle icon="✍️" title="Sign Manifest" />
          <Frame variant="outlined">
            <Typography variant="h5" component="h2" style={{ marginBottom: 8 }}>
              Manifesto
            </Typography>
            <StyledInput
              label="Input Manifesto ID"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <div style={{ marginTop: 16 }}>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                style={{ minWidth: 240, width: "100%" }}
                onClick={handleDownloadButtonClick}
              >
                Download Manifesto
              </Button>
            </div>
          </Frame>
          {isDisplay && (
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
                  tokenName={value.tokenInfo.name}
                  symbol={value.tokenInfo.symbol}
                  totalSupply={value.tokenInfo.totalSupply}
                  decimals={value.tokenInfo.decimals}
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
                  name={name}
                  onNameChange={(e) => setName(e.target.value)}
                  image={image}
                  handleImageUpload={handleImageUpload}
                  onUpdateButtonClick={() => console.log("update")}
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
                  disabled={isSigned || name === "" || image === ""}
                  onClick={handleSignButtonClick}
                >
                  {isSigned ? "Signed it!" : "Sign"}
                </Button>
              </div>
            </>
          )}
        </div>
      </StyledContainer>
    </>
  );
};
