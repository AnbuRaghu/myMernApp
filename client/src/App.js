import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter maxWidth="lg">
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/auth" exact component={Auth}></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
