import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import PriceComp from "./PriceComparer"
import Profile from "./Profile"
import RecipeGenerator from "./RecipeGenerator"
import Dietary from "./DietaryRestrictions"
import './Home.css'

function Home() {

    return (
        <div>
            <div className='Homepage'>
                <header>
                    <nav className="navbar">
                    <label className="title">WhatToCook</label>
                        <ul className='navbar-home'>
                            <a href="/home">
                            <button className="home">Home</button>
                            </a>
                            <Link to="/RecipeGenerator">
                            <button className="recipe">Recipe Generator</button>
                            </Link>
                            <Link to="/PriceComparer">
                            <button className="price">Price Comparator</button>
                            </Link>
                            <Link to="/dietary">
                            <button className="diet">Dietary Restrictions</button>
                            </Link>
                            <Link to="/profile">
                            <button className="profile">Profile</button>
                            </Link>
                        </ul>
                    </nav> 
                </header>
                <div className='overlay'></div>
                <div className='content'>
                    <h1 className='home-title'>WELCOME TO WhatToCook</h1>
                    <p className='home-description'>Cook with convenience and savings using WhatToCook! Easily manage your fridge inventory, discover delicious recipes tailored to your ingredients, create shopping lists with cost estimates, and find the best grocery store deals—all in one app.</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home