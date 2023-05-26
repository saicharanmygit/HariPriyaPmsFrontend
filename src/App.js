import React from "react";
import "./css/App.css";
import PortComposition from "./components/Portfolio/PortComposition";

import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./components/Portfolio/LandingPage";
import PortHeader from "./components/Portfolio/PortHeader";
import Footer from "./components/Navbar/Footer";
import AddThemes from "./components/Portfolio/AddThemes";
import HomePage from "./components/Navbar/HomePage";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
     
        <Route path="/portheader" element={<PortHeader />}></Route>
        <Route path="/portcomposition" element={<PortComposition />}></Route>
        <Route path="/addtheme" element={<AddThemes />}></Route>
        <Route exact path="/landingpage" element={<LandingPage/>}></Route>
        
      </Routes>
      <Outlet/>
      <Footer/>
      
    </div>
  );
}

export default App;
