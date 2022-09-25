import React, { useState, useContext } from "react";
import "./mavbarmobileview.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Navigate,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

import { UserContext } from "../../ContextAPI/UserContext";

const NavbarMobileView = () => {
  let navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleNavbaropen = () => {
    setOpen(!open);
  };

  return (
    <div className="responsive-mobile-view">
      <div className="container-fluid mobile-view-header">
        <p>
          <GiHamburgerMenu size={25} onClick={handleNavbaropen} />
        </p>
      </div>

      {open ? (
        <div className="mobile-nav">
          {state && state.token && state.token ? (
            <ul>
              <li className="nav-item">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {state && state.user && state.user.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/dashboard"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li className="nav-item">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/explore"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Explore
                </Link>
              </li>

              <li className="nav-item">
                {state?.user ? (
                  <Link
                    to={"/library"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Library
                  </Link>
                ) : (
                  <Link
                    to={"/signin"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Library
                  </Link>
                )}
              </li>

              <li className="nav-item">
                {state?.user ? (
                  <Link
                    to={"/history"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    History
                  </Link>
                ) : (
                  <Link
                    to={"/signin"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    History
                  </Link>
                )}
              </li>

              <li className="nav-item">
                <Link
                  to={"/signup"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/signin"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default NavbarMobileView;
