import React from "react";
import logo from "../images/layout/BottieLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'



import "./Header.css"

export default function Header() {
  return (
    <header>
      <a href="/">
        <img src={logo} alt="Bottie Logo" className="logo" href="/" />
      </a>
      <nav className="nav">
        <a className="nav-link active" aria-current="page" href="/">Get Started with Bottie</a>
        <a classNam="nav-link" href="/products">All Plants</a>
      </nav>
      <div className="nav-icons">
        <FontAwesomeIcon className="icon" icon={faUser} />
        <FontAwesomeIcon className="icon" icon={faCartShopping} />
      </div>
    </header>
  );
};