import React from "react";
import Header from "./components/pageHeader";
import Movies from "./components/movies";
import MovieDetails from "./components/moviedetals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <br></br>
        <Route exact path="/">
          <Movies />
        </Route>
        <Route path="/details/:name" component={MovieDetails}></Route>
      </div>
    </Router>
  );
}

export default App;
