import React from "react";
import { Header } from "../../organisms/Header/index";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { theme } from "../../util/style/theme";
import { StyledContainer } from "../../util/style/commonStyle";
import WalletButton from "../../atoms/WalletButton";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

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
  margin-bottom: 12px;
  ${theme.breakpoints.down(600)} {
    display: block;
  }
`;

const StyledInput = styled(TextField)`
  width: 60%;
  margin-bottom: 16px;
  ${theme.breakpoints.down(600)} {
    width: 100%;
  }
`;

export const MainPageTemplate = ({
  provider,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  textValue,
  handleTextChange,
  handleViewButtonClick,
}) => {
  return (
    <>
      <Header
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <StyledContainer maxWidth="md">
        {!provider ? (
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
                Issuing a token is easy. But it is very difficult to operate
                them properly. "Token with Manifesto" asks you to create a
                Manifesto for issuing a token. Who will issue a token, for what
                purpose, and how will they be used? We will ask you to get sign
                the manifesto with three people. Now, let's connect to the
                wallet and get started!
              </Typography>
              <div style={{ textAlign: "center" }}>
                <WalletButton
                  provider={provider}
                  loadWeb3Modal={loadWeb3Modal}
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
                />
              </div>
            </Describe>
          </>
        ) : (
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
                      component={Link}
                      to="/creator/token"
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
                      component={Link}
                      to="/witness/sign"
                    >
                      Sign Manifesto
                    </Button>
                  </div>
                </Card>
              </Grid>
            </StyledGrid>
            <Card variant="outlined" style={{ textAlign: "center" }}>
              <StyledInput
                label="Input Manifesto Doc ID"
                value={textValue}
                onChange={handleTextChange}
              />
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  disableElevation
                  style={{ minWidth: 240 }}
                  onClick={handleViewButtonClick}
                >
                  View Token Info
                </Button>
              </div>
            </Card>
          </div>
        )}
      </StyledContainer>
    </>
  );
};
