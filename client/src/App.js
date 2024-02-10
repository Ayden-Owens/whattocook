import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import FrontPage from "./FrontPage";
import Register from "./Register";
import Header from "./Header";
import Footer from "./Footer";
import Recipes from "./RecipeGenerator";
import PriceComp from "./PriceComparer";
import Contact from "./Contact";
import About from "./About";
import DietaryRestrictions from "./DietaryRestrictions";
import RecipeGenerator from "./RecipeGenerator";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/" Component={FrontPage} />
          <Route path="/home" Component={Home} />
          <Route path="/RecipeGenerator" Component={RecipeGenerator} />
          <Route path="/PriceComparer" Component={PriceComp} />
          <Route path="/profile" Component={Profile} />
          <Route path="/contactus" Component={Contact} />
          <Route path="/about" Component={About} />
          <Route path="/dietary" Component={DietaryRestrictions} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
