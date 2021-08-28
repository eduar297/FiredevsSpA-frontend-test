import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";

import Profile from "./components/Profile";
import Home from "./components/Home";

import Menu from "./components/Menu";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Body = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route patch="/profile" component={Profile} />
        <Route path="/*" component={Home} />
      </Switch>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Menu Body={Body} />
      </Router>
    </div>
  );
};

export default App;
