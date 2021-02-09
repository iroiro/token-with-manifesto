import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import CreateTokenPage from "./components/pages/CreateTokenPage";
import WitnessSignPage from "./components/pages/SignPage";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../src/components/util/style/theme";

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/creator/token">
              <CreateTokenPage />
            </Route>
            <Route path="/creator/token/:docId">
              <CreateTokenPage />
            </Route>
            <Route path="/witness/sign">
              <WitnessSignPage />
            </Route>
            {/* TODO get token address as variable */}
            <Route path="/token/address">token info page</Route>
            {/*  TODO add more pages  */}
          </Switch>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
