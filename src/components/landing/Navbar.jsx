/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import Logo from "../assets/Logo.svg";
import UserButton from "./Profile";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.scss"




const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)

  return (

    <div className="header">
      <a className="logo" href="/"><img src={Logo} alt="logo" /></a>
      <nav>
        {/* <ul className="nav__links">
          <li><a href="#">Matches</a></li>
          <li><a href="#">Clubs</a></li>
          <li><a href="#">About</a></li>
        </ul> */}
      </nav>
      {
        currentUser ? <UserButton className="cta" /> : <a className="primary-button cta" href="/login">Login</a>
      }
    </div >
  );
};

export default Navbar;
