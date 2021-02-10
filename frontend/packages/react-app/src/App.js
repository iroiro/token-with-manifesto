import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import CreateTokenPage from "./components/pages/CreateTokenPage";
import WitnessSignPage from "./components/pages/SignPage";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../src/components/util/style/theme";
import TokenInfoPage from "./components/pages/TokenInfoPage";

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/creator/token" component={CreateTokenPage} />
            <Route
              path="/creator/token/:manifestoDocId"
              component={CreateTokenPage}
            />
            <Route path="/witness/sign" component={WitnessSignPage} />
            {/* TODO get token address as variable */}
            <Route path="/token/:manifestoDocId" component={TokenInfoPage} />
            {/*  TODO add more pages  */}
          </Switch>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
