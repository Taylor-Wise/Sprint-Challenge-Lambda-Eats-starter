import React from "react";
import './App.css';
import HomePage from "./Components/home_page";
import Form from "./Components/form";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

const App = () => {
  return (
    <Router>
    <div className="container">
    <nav className="navbar">
      <h1>LAMBDA EATS</h1>
        <Link to="/">
          <button>Home</button>
          </Link>
        <br/>
        <Link to="/pizza"> 
        <button data-cy="orderBtn">Order</button>
        </Link>
    </nav>
    <div className="App">
      
      <Route path="/pizza" component={Form} />
      <Route exact path="/" component={HomePage} />
      </div>
    </div>
  </Router>
  )
};
export default App;
