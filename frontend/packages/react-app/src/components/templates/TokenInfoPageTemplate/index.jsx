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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const EtherScanLink = styled.a`
  display: flex;
  justify-content: center;
  color: #000;
  width: fit-content;
  margin: 0 auto;
`;

export const TokenInfopageTemplate = ({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  tokenInfo,
  creatorInfo,
  witness,
  handleReadManifestoButtonClick,
  rows,
}) => (
  <>
    <Header
      provider={provider}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
    />
    <StyledContainer maxWidth="sm">
      <div>
        <IconTitle icon="ℹ️" title="Token Info" />
        <Frame variant="outlined">
          <TokenInfo
            tokenName={tokenInfo === undefined ? "" : tokenInfo.token.name}
            symbol={tokenInfo === undefined ? "" : tokenInfo.token.symbol}
            totalSupply={
              tokenInfo === undefined ? "" : tokenInfo.token.totalSupply
            }
            decimals={tokenInfo === undefined ? "" : tokenInfo.token.decimals}
          />
          <div>
            <EtherScanLink
              href={`https://rinkeby.etherscan.io/address/${
                tokenInfo === undefined ? "" : tokenInfo.token.id
              }`}
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
        <Frame variant="outlined" style={{ padding: "52px 22px" }}>
          <TableContainer>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.balance}</TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      style={{
                        padding: 32,
                        textAlign: "center",
                        color: "#7e7e7e",
                      }}
                    >
                      No data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
