import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Navbar.css";

const ChatNav = () => {

  return (
    <Navbar
      className="my-navbar"
      style={{ height: "70px", width: "1300px", backgroundColor: "#5F264A" }}
      expand="lg"
    >
      <Navbar.Brand href="/">
        <button className="home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="50"
            fill="currentColor"
            class="bi bi-house-door justify-left"
            viewBox="0 0 16 16"
          >
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
          </svg>
        </button>
      </Navbar.Brand>
      <Navbar.Brand style={{display:"flex",justifyContent:'center',color:'white',fontSize:'40px'}}>Portfolio Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown className="cutom-dropdown" title="Admin" id="basic-nav-dropdown" style={{right:'0',left:'500px',top:'20px',fontSize:'20px'}}>
            <NavDropdown.Item href="#action/1.1" style={{ backgroundColor:'lightblue',color:'green' }}
            activeStyle={{ backgroundColor:'blue',color:'black' }} >USM</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Explore" id="basic-nav-dropdown" style={{right:'0',left:'200px',top:'20px',fontSize:'20px'}}>
            <NavDropdown.Item href="/addtheme" style={{ backgroundColor:'lightblue',color:'green' }}
            activeStyle={{ backgroundColor:'blue',color:'black' }}>Theme</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ChatNav;
