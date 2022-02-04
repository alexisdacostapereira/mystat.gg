import React,  { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom"
import News from './components/News'
import Lol from "./components/Lol";
import Boutique from "./Boutique/Index";
import Connection from "./components/Connection";
import Register from "./components/Register";
import Forum from "./components/Forum"
import LolStat from "./components/LolStat";
import PrivateRoute from "./components/PrivateRoute"
import PUBG from "./components/PUBG"
import NotFound from "./components/NotFound";
import PUBGStat from "./components/PUBGStat";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Connection />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <PrivateRoute exact path="/lol">
          <Lol/>
        </PrivateRoute>
        <PrivateRoute exact path="/lol/:id">
          <LolStat/>
        </PrivateRoute>
        <PrivateRoute exact path="/pubg">
          <PUBG/>
        </PrivateRoute>
        <PrivateRoute exact path="/pubg/:id">
          <PUBGStat/>
        </PrivateRoute>
        <PrivateRoute exact path="/news">
          <News />
        </PrivateRoute>
        <PrivateRoute exact path="/boutique">
          <Boutique/>
        </PrivateRoute>
        <PrivateRoute exact path="/parametres">
          
        </PrivateRoute>
        <Route>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
