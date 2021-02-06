import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import BasicInfoPage from "./components/pages/BasicInfoPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/creator/basic">
          <BasicInfoPage />
        </Route>
        <Route path="/creator/create">create token page</Route>
        <Route path="/witness/sign">sign manifest page</Route>
        {/* TODO get token address as variable */}
        <Route path="/token/address">token info page</Route>
        {/*  TODO add more pages  */}
      </Switch>
    </Router>
  );
}

export default App;
