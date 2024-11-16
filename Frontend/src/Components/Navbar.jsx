import React, { useState } from "react";
import logo from "../assets/IdeaLab.png";
import styles from "../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"; // Importing the hamburger menu icon

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // To toggle the menu visibility
  const isLoggedIn = false;
  const navigate = useNavigate();

  const handlelogoclick = () => {
    navigate('/');
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to close the menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false); // Close the menu
  };

  return (
    <div className={styles.navbar_wrapper}>
      {/* Left-aligned Logo */}
      <img src={logo} alt="IdeaLab" className={styles.logo} onClick={handlelogoclick} />

      {/* Hamburger Menu for Mobile View */}
      <div className={styles.hamburger_menu} onClick={toggleMenu}>
        <GiHamburgerMenu size={30} color="#333" /> {/* Using the hamburger icon */}
      </div>

      {/* Combined Navigation Links and Authentication Links */}
      <div className={`${styles.nav_links_and_auth} ${menuOpen ? styles.open : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} // Close the menu when this link is clicked
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} // Close the menu when this link is clicked
        >
          Projects
        </NavLink>
        <NavLink
          to="/ideas"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} // Close the menu when this link is clicked
        >
          Ideas
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          onClick={handleLinkClick} // Close the menu when this link is clicked
        >
          Blog
        </NavLink>

        {/* Right-aligned Authentication Links */}
        {isLoggedIn ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={handleLinkClick} // Close the menu when this link is clicked
          >
            Profile
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={handleLinkClick} // Close the menu when this link is clicked
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={handleLinkClick} // Close the menu when this link is clicked
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
