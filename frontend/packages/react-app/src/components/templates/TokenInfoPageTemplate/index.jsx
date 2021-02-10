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
import { CopyToClipboard } from "react-copy-to-clipboard/lib/Component";

const EtherScanLink = styled.a`
  display: flex;
  justify-content: center;
  color: #000;
  width: fit-content;
  margin: 0 auto;
`;

export const TokenInfopageTemplate = ({
  tokenInfo,
  creatorInfo,
  witness,
  handleReadManifestoButtonClick,
}) => (
  <>
    <Header />
    <StyledContainer maxWidth="sm">
      <div>
        <IconTitle icon="ℹ️" title="Token Info" />
        <Frame variant="outlined">
          <TokenInfo
            tokenName={tokenInfo.token.name}
            symbol={tokenInfo.token.symbol}
            totalSupply={tokenInfo.token.totalSupply}
            decimals={tokenInfo.token.decimals}
          />
          <div>
            {/* TODO: Link to Etherscan */}
            <EtherScanLink href="/" target="_blank" rel="noreferrer noopener">
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
          <Typography variant="h5" component="h2" style={{ marginBottom: 24 }}>
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
          <Typography variant="h5" component="h2" style={{ marginBottom: 24 }}>
            Creator
          </Typography>
          <div>
            <UserAvatar
              userName={creatorInfo.name}
              iconImageUrl={creatorInfo.imageUrl}
            />
          </div>
          <Typography variant="h5" component="h2" style={{ marginBottom: 24 }}>
            Witness
          </Typography>
          <div>
            {witness.map((witness, index) => {
              return (
                <UserAvatar
                  userName={witness.name}
                  iconImageUrl={witness.imageUrl}
                  key={witness.userName + witness.imageUrl + index}
                />
              );
            })}
          </div>
        </Frame>
        <div style={{ maxWidth: 416, margin: "0 auto 32px" }}>
          <CopyToClipboard text={window.location.href}>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              style={{ minWidth: 240, width: "100%" }}
            >
              Copy URL of this page
            </Button>
          </CopyToClipboard>
        </div>
      </div>
    </StyledContainer>
  </>
);
