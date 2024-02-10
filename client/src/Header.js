import "./Header.css";
import PriceComp from "./PriceComparer"
import Profile from "./Profile"
import RecipeGenerator from "./RecipeGenerator"
import Dietary from "./DietaryRestrictions"
import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar-H">
        <label className="title-H">WhatToCook</label>
        <ul className="navbar-ul">
            <a href="/home" className="Home-H">Home</a>
            <Link to="/RecipeGenerator" className="Recipe-H">Recipe Generator</Link>
            <Link to="/PriceComparer" className="Price-H">Price Comparator</Link>
            <Link to="/dietary" className="Diet-H">Dietary Restrictions</Link>
            <Link to="/profile" button className="Profile-H">Profile</Link>
        </ul>
      </nav> 
    </header>
  );
}

export default Header;
