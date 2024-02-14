import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import Home from "./Pages/Home/Home";
import Create from "./Pages/Create/Create";

function App() {
  return (
    <div style={{ fontFamily: "roboto" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
