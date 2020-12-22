import React, { useState } from "react";
import Logo from "../statics/logo.png";
import { useHistory } from "react-router-dom";
import useOrder from "./useOrder.jsx";
import AktionDropDown from "./aktionDropdown.jsx";

import "./nav.scss";

const Nav = () => {
  const history = useHistory();
  const [trigger, setTrigger] = useState("hamburger hamburger--collapse");
  const [showMenu, setShowMenu] = useState("hamburger-menu d-none");
  const [toggle, setToggle] = useState(false);
  const { setpaymentMethod } = useOrder();
  const openMenu = () => {
    if (toggle) {
      setTrigger("hamburger hamburger--collapse");
      setToggle(false);
      setShowMenu("hamburger-menu d-none");
    } else {
      setTrigger("hamburger hamburger--collapse is-active");
      setToggle(true);
      setShowMenu("hamburger-menu d-block");
    }
  };
  const goHome = () => {
    setpaymentMethod("bar");
    history.push("/");
  };
  return (
    <div className="nav">
      <div className="logo" onClick={() => goHome()}>
        <img src={Logo} alt="logo" />
      </div>
      <h1 style={{ fontFamily: "Lobster, cursive", fontWeight: "400" }}>
        Some Delicious Things
      </h1>
      <button className={trigger} onClick={() => openMenu()}>
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
        <div className={showMenu}>
          <button onClick={() => history.push("/aboutus")}>About us</button>
          <button onClick={() => history.push("/impressum")}>Impressum</button>
        </div>
      </button>
      <AktionDropDown />
    </div>
  );
};

export default Nav;
