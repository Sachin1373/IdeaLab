import React, { useState,useEffect } from "react";
import logo from "../assets/IdeaLab.png";
import styles from "../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"; 

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserName, setUserName] = useState("");
  const navigate = useNavigate();

  
 
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
      setUserName(username.charAt(0).toUpperCase());
    }else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, [localStorage.getItem("username")]);
  
  const handlelogoclick = () => {
    navigate('/');
  };

 
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

 
  const handleLinkClick = () => {
    setMenuOpen(false); 
  };

  return (
    <div className={styles.navbar_wrapper}>

      <img src={logo} alt="IdeaLab" className={styles.logo} onClick={handlelogoclick} />

    
      <div className={styles.hamburger_menu} onClick={toggleMenu}>
        <GiHamburgerMenu size={30} color="#333" /> 
      </div>

     
      <div className={`${styles.nav_links_and_auth} ${menuOpen ? styles.open : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} 
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} 
        >
          Projects
        </NavLink>
        <NavLink
          to="/ideas"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} 
        >
          Ideas
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} 
        >
          Blog
        </NavLink>

     
              {isLoggedIn ? (
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.profileLink} ${styles.activep}` : styles.profileLink
          }
          onClick={handleLinkClick}
        >
          <div className={styles.profile}>{UserName}</div> 
        </NavLink>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={handleLinkClick}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={handleLinkClick}
          >
            Signup
          </NavLink>
        </>
      )}
      </div>
    </div>
  );
}

export default Navbar;
