import React from "react";
import { Header } from "../../organisms/Header/index";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { theme } from "../../util/style/theme";
import { useState } from "react";
import { StyledContainer } from "../../util/style/commonStyle";

const Card = styled(Paper)`
  padding: 22px 22px 32px;
  height: 100%;
  box-sizing: border-box;
`;

const Describe = styled(Paper)`
  padding: 42px;
  height: 100%;
  box-sizing: border-box;
  margin-bottom: 32px;
  ${theme.breakpoints.down(600)} {
    padding: 22px;
  }
`;

const StyledGrid = styled(Grid)`
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

export const MainPageTemplate = ({ isConnected }) => {
  const [isWalletConnected, setIsWalletconnected] = useState(isConnected);

  const handleConnectButtonClick = () => {
    setIsWalletconnected(true);
  };

  return (
    <>
      <Header />
      <StyledContainer maxWidth="md">
        {!isWalletConnected && (
          <>
            <Typography
              variant="h4"
              component="h1"
              style={{ textAlign: "center", marginBottom: 24 }}
            >
              Token with Manifesto
            </Typography>
            <Describe variant="outlined">
              <Typography
                variant="body1"
                component="p"
                style={{ marginBottom: 24 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  disableElevation
                  style={{ width: "32%", minWidth: 240 }}
                  onClick={handleConnectButtonClick}
                >
                  Connect Wallet
                </Button>
              </div>
            </Describe>
          </>
        )}
        {isWalletConnected && (
          <div>
            <StyledGrid container spacing={2}>
              <Grid item xs style={{ alignSelf: "stretch" }}>
                <Card variant="outlined">
                  <Chip
                    label="For Creator"
                    color="primary"
                    style={{ marginBottom: 24 }}
                  />
                  <div style={{ marginBottom: 24 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      📝 Create Token with Manifesto
                    </Typography>
                    <Typography variant="body1" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis
                    </Typography>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      Create Token with Manifesto
                    </Button>
                  </div>
                </Card>
              </Grid>
              <Grid item xs style={{ alignSelf: "stretch" }}>
                <Card variant="outlined">
                  <Chip
                    label="For Witness"
                    color="primary"
                    variant="outlined"
                    style={{ marginBottom: 24 }}
                  />
                  <div style={{ marginBottom: 24 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      ✍️ Sign Manifesto
                    </Typography>
                    <Typography variant="body1" component="p">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis
                    </Typography>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      disableElevation
                      style={{ minWidth: 240 }}
                    >
                      Sign Manifesto
                    </Button>
                  </div>
                </Card>
              </Grid>
            </StyledGrid>
          </div>
        )}
      </StyledContainer>
    </>
  );
};
