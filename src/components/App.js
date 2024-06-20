import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Navbar from "./ui/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<><Navbar/> <Dashboard /></>} />
        </Routes>
      </BrowserRouter>
      <div
        className='app-bg'
      />
    </div>
  );
}

export default App;
