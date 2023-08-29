import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import "../styles/navbar.css";

const Navbar = () => {
  const [navbarBackground, setNavbarBackground] = useState("transparent");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setNavbarBackground("#f2f2f2");
        setScrolled(true);
      } else {
        setNavbarBackground("transparent");
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Menu
      fixed="top"
      className={`navbar borderless ${scrolled ? "scrolled" : ""}`}
      style={{
        marginTop: "1em",
        borderBottom: "none",
        backgroundColor: navbarBackground,
      }}
    >
      <Container>
        <Menu.Item as={Link} to="/" header>
          StockSage
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to="/upload">
            Fetch
          </Menu.Item>
          <Menu.Item as={Link} to="/search">
            Analyze
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
