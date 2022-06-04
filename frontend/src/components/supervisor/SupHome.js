import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./sup.css";

export default function SupHome() {


  return (
    <div >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Supervisor Home</Navbar.Brand>&nbsp;&nbsp;&nbsp;
          <Nav className="me-auto">
            <Nav.Link href="/SupTopic">Topics</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Nav.Link href="/SupEvalution">Document Evaluation</Nav.Link>&nbsp;&nbsp;&nbsp;
            <Nav.Link href="#pricing">Documents</Nav.Link>&nbsp;&nbsp;&nbsp;
          </Nav>
        </Container>
      </Navbar>
      <div className="bg-image"></div>
     
    </div>
  )
}