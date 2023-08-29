import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import backgroundImage from "../assets/stocks.jpg";
import "../styles/stocks.css";

const Stocks = () => {
  const [inputClass, setInputClass] = useState("ui massive icon input");

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setInputClass("ui big icon input");
    } else {
      setInputClass("ui massive icon input");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Container textAlign="center" style={{ paddingTop: "40vh" }}>
        <Header
          as="h1"
          style={{ color: "white", fontWeight: "bold", fontSize: "3em" }}
        >
          Fetch Stocks
        </Header>
        <p className="subtext">
          Discover stocks and effortlessly download real-time data with our
          user-friendly tool.
        </p>

        <div style={{ marginTop: "1em" }} className={inputClass}>
          <div className="ui icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Type Something..."
            />
            <i className="search icon"></i>
          </div>
          <div className="results"></div>
        </div>
      </Container>
      <Container textAlign="center" style={{ marginBottom: "1em" }}>
        <p style={{ color: "white" }}>Made with ❤️ by Ayush</p>
      </Container>
    </div>
  );
};

export default Stocks;
