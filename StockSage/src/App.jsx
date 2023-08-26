import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/navbar";
import Home from "./pages/home";
import Analyse from "./pages/analyse";
import Docs from "./pages/docs";

function App() {
  return (
    <>
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/analyse" element={<Analyse />}></Route>
          <Route path="/docs" element={<Docs />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
