import React, { useState } from "react";

import { Logo } from "../components/Logo";
import { Link } from "wouter";
import { useAppContext } from "../context/AppContext";

export function Navbar() {
  const { setShowModal } = useAppContext();
  const [isActive, setIsActive] = useState(false);

  return (
    <nav
      className="navbar has-background-info-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <Logo />
        </a>
        <span
          role="button"
          className={`navbar-burger ${isActive && "is-active"}`}
          aria-label="menu"
          aria-expanded={(isActive && "true") || "false"}
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </span>
      </div>
      <div className={`navbar-menu ${isActive && "is-active"}`}>
        <div className="navbar-start">
          <Link href="/dashboard" className="navbar-item">
            Home
          </Link>
          <Link href="/account" className="navbar-item">
            Account
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                className="button is-primary"
                onClick={() => setShowModal(true)}
              >
                <span className="icon is-small">
                  <i className="fas fa-plus" />
                </span>
              </button>
              {/* <button className="button is-link" onClick={auth.logout}>
                <span className="icon is-small">
                  <i className="fas fa-sign-out-alt" />
                </span>
                <span>Log Out</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
