import React from "react";
import { Container, Header, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/home.jpg";
import "../styles/home.css";

const Home = () => {
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
          style={{ color: "white", fontWeight: "bold", fontSize: "5em" }}
        >
          StockSage
        </Header>
        <p className="subtext">Your Intelligent Stock Advisor</p>
        <Grid columns="equal" stackable centered style={{ marginTop: "2em" }}>
          <Grid.Row verticalAlign="middle">
            <Grid.Column textAlign="center">
              <Button.Group size="huge">
                <Button primary as={Link} to="/stocks">
                  Fetch
                </Button>
                <Button.Or />
                <Button secondary as={Link} to="/analysis">
                  Analyze
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Container textAlign="center" style={{ marginBottom: "1em" }}>
        <p style={{ color: "white" }}>Made with ❤️ by Ayush</p>
      </Container>
    </div>
  );
};

export default Home;
