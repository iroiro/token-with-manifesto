import React from "react";
import { IconTitle } from "../../molecules/IconTitle";
import { TokenInfo } from "../../molecules/TokenInfo";
import { Header } from "../../organisms/Header/index";
import { Frame, StyledContainer } from "../../util/style/commonStyle";
import OpenInNewRoundedIcon from "@material-ui/icons/OpenInNewRounded";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { UserAvatar } from "../../molecules/UserAvatar";
import { useLocation } from "react-router-dom";

const EtherScanLink = styled.a`
  display: flex;
  justify-content: center;
  color: #000;
  width: fit-content;
  margin: 0 auto;
`;

export const TokenInfopageTemplate = ({ value }) => {
  const location = useLocation();
  const handleReadManifestoButtonClick = () => {
    // TODO: Add downloading Manifesto (or Link?)
    console.log(value.manifestoUrl);
  };

  const handleCopyUrlButtonClick = () => {
    // TODO: Add Copying page URL
    console.log(location.pathname);
  };

  console.log(location.pathname);
  return (
    <>
      <Header />
      <StyledContainer maxWidth="sm">
        <div>
          <IconTitle icon="ℹ️" title="Token Info" />
          <Frame variant="outlined">
            <TokenInfo
              tokenName={value.tokenInfo.name}
              symbol={value.tokenInfo.symbol}
              totalSupply={value.tokenInfo.totalSupply}
              decimals={value.tokenInfo.decimals}
            />
            <div>
              {/* TODO: Link to Etherscan */}
              <EtherScanLink
                href={value.tokenInfo.tokenAddress}
                target="_blank"
                rel="noreferrer noopener"
              >
                View on Etherscan
                <OpenInNewRoundedIcon
                  fontSize="small"
                  color="primary"
                  style={{ fontSize: "1rem" }}
                />
              </EtherScanLink>
            </div>
          </Frame>
          <Frame variant="outlined">
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 24 }}
            >
              Manifesto
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                style={{ minWidth: 240 }}
                onClick={handleReadManifestoButtonClick}
              >
                Read manifesto
              </Button>
            </div>
          </Frame>
          <Frame variant="outlined">
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 24 }}
            >
              Creator
            </Typography>
            <div>
              <UserAvatar
                userName={value.creator.userName}
                iconImageUrl={value.creator.iconImageUrl}
              />
            </div>
            <Typography
              variant="h5"
              component="h2"
              style={{ marginBottom: 24 }}
            >
              Witness
            </Typography>
            <div>
              {value.witness.map((witness) => {
                return (
                  <UserAvatar
                    userName={witness.userName}
                    iconImageUrl={value.witness.iconImageUrl}
                    key={witness.userName + witness.iconImageUrl}
                  />
                );
              })}
            </div>
          </Frame>
          <div style={{ maxWidth: 416, margin: "0 auto 32px" }}>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              style={{ minWidth: 240, width: "100%" }}
              onClick={handleCopyUrlButtonClick}
            >
              Copy URL of this page
            </Button>
          </div>
        </div>
      </StyledContainer>
    </>
  );
};
