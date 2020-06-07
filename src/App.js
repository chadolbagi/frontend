import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./components/Header";
import CallerPage from "./pages/CallerPage";
import IndexPage from "./pages/IndexPage";
import OperatorPage from "./pages/OperatorPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header />

      <Container>
        <Switch>
          <Route path="/caller">
            <CallerPage />
          </Route>
          <Route path="/operator">
            <OperatorPage />
          </Route>
          <Route path="/">
            <IndexPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
