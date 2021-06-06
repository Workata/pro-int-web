import React from "react";
import {Switch, Route} from "react-router-dom";

import Main from "./components/Main";
import Signin from "./components/Signin";
import Login from "./components/Login";
import Create from "./components/Create";
import RateFilms from "./components/RateFilms";

const  Routes = () => (
    <Switch>
        {/* <Route exact path="/" component = {App} /> */}
        <Route exact path="/register" component = {Signin} />
        <Route exact path="/login" component = {Login} />
        <Route exact path="/create" component = {Create} />
        <Route exact path="/rate-films" component = {RateFilms} />
    </Switch>
);

export default Routes;