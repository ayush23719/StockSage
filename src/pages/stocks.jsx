import React, { useState, useEffect } from "react";
import { Container, Header, Dropdown, Button } from "semantic-ui-react";
import backgroundImage from "../assets/stocks.jpg";
import Papa from "papaparse";
import axios from "axios";
import "../styles/stocks.css";

const Stocks = () => {
  const [inputClass, setInputClass] = useState("ui massive icon input");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [stockData, setStockData] = useState(null);
  const [tiingoStockData, setTiingoStockData] = useState(null);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setInputClass("ui big icon input");
    } else {
      setInputClass("ui massive icon input");
    }
  };

  const handleSearchChange = async (e) => {
    const { value } = e.target;
    setSelectedStock("");
    setStockData(null);

    try {
      const response = await axios.get(
        `https://api.twelvedata.com/stocks?symbol=${value}&apikey=4441b35408784a8c82f012854e729f80`
      );
      const data = response.data.data.map((stock) => ({
        key: stock.symbol,
        text: stock.name,
        value: stock.symbol,
      }));
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = async (e, data) => {
    setSelectedStock(data.value);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 5);

      const startDateStr = formatDate(startDate);
      const endDateStr = formatDate(endDate);

      const requestData = {
        symbol: data.value,
        startDate: startDateStr,
        endDate: endDateStr,
      };

      const tiingoResponse = await axios.post(
        "http://127.0.0.1:3001/stocks",
        requestData
      );

      const tiingoStockData = tiingoResponse.data;
      setTiingoStockData(tiingoStockData);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDownloadCSV = (data) => {
    if (data) {
      const csv = Papa.unparse(data);

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      const stockName =
        suggestions.find((option) => option.value === selectedStock)?.text ||
        selectedStock;
      a.href = url;
      a.download = `${stockName}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const dropdownStyle = {
    position: "absolute",
    width: "100%",
    top: "100%",
    left: 0,
    marginTop: "2px",
    maxHeight: "200px",
  };

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
              onChange={handleSearchChange}
            />
            <i className="search icon"></i>
            {suggestions.length > 0 && selectedStock === "" && (
              <Dropdown
                fluid
                options={suggestions}
                selection
                onChange={handleSuggestionClick}
                style={dropdownStyle}
                open={suggestions.length > 0 && selectedStock === ""} // Open when suggestions available and no stock selected
              >
                <Dropdown.Menu
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {suggestions.map((option) => (
                    <Dropdown.Item key={option.key} {...option} />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <div className="results"></div>
        </div>
        {tiingoStockData && (
          <div style={{ marginTop: "1em" }}>
            <Button
              primary
              style={{ margin: "0 auto" }}
              onClick={() => handleDownloadCSV(tiingoStockData)}
            >
              Download CSV
            </Button>
          </div>
        )}
      </Container>
      <Container textAlign="center" style={{ marginBottom: "1em" }}>
        <p style={{ color: "white" }}>Made with ❤️ by Ayush</p>
      </Container>
    </div>
  );
};

export default Stocks;
