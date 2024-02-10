import "./Footer.css";
import PriceComparer from "./PriceComparer";
import Profile from "./Profile";
import RecipeGenerator from "./RecipeGenerator";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function ContactUs() {
return (
    <a href="/contactus">
    <button>
      Contact Us
    </button>
    </a>
    );
}

function About() {
return (
    <Link to="/about">
    <button>
      About Us
    </button>
    </Link>
    );
}

function Footer() {
    return (
      <div className='footer'>
          <label className="foot-title">WhatToCook</label>
          <div className="company">
            <label className="company-title">Company</label>
            <ul className="company-links">
              <li><About/></li>
              <li><ContactUs/></li>
            </ul>
          </div>
          <div className="Follow">
            <label className="follow-title">Follow Us</label>
            <ul className="follow-links">
              <li>
                <button>Instagram</button>
              </li>
            </ul>
          </div>
      </div>
    )
  }

export default Footer;
  