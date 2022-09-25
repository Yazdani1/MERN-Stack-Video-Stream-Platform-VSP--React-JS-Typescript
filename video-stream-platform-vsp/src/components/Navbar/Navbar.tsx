import React, { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";

import "./navbar.css";
import { UserContext } from "../../ContextAPI/UserContext";

interface NavbarProps {
  handleExpandClick?: () => void;
}

const Navbar = ({ handleExpandClick }: NavbarProps) => {
  let navigate = useNavigate();

  const [q, setQ] = useState("");

  // to use context api
  const [state, setState] = useContext(UserContext);

  // to use redux toolkit

  const userInfo = useSelector((state: any) => state.user.currentUser);

  const [navScrollColor, setNavScrollColor] = useState(false);

  const onChangeNavColor = () => {
    if (window.scrollY >= 100) {
      setNavScrollColor(true);
    } else {
      setNavScrollColor(false);
    }
  };

  window.addEventListener("scroll", onChangeNavColor);

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    window.localStorage.removeItem("token");
    navigate("/signin");
    setState("");
  };

  return (
    <nav
      className={
        navScrollColor ? "navbar-scroll-color navbar-main" : "navbar-main"
      }
    >
      <div className="hamburger-icon" onClick={handleExpandClick}>
        <p>
          <GiHamburgerMenu size={20} /> <span style={{fontSize:"15px",color:"black"}}>Video Streaming Platform</span>
        </p>
      </div>

      <div className="navbar-searchfield">
        <input
          type="text"
          className="form-controssl"
          onChange={(e) => setQ(e.target.value)}
        />
        <HiOutlineSearch size={35} onClick={()=>navigate(`/search?search_query=${q}`)}/>
      </div>

      {state && state.token && state.token ? (
        <ul>
          <li className="nav-item">
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none", color: "black" }}
            >
              {state && state.user && state.user.name}
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none", color: "black" }}
            >
              {userInfo?.user.email}
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="nav-item">
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Sign Up
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Sign In
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
export default Navbar;
