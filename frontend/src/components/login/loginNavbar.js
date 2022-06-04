import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

const Nav2 = () => {
  useEffect(() => {
    var userData = localStorage.getItem("user");

    if (userData) {
      var type = JSON.parse(userData).type;

      if (type == "ADMIN") {
        window.location.href = "/allusers";
      } else if (type == "STUDENT") {
        window.location.href = "/studentMain";
      } else if (type == "STAFF") {
        window.location.href = "/staffview";
      }
      setLoading(true);
    }
  }, []);

  return (
    <Navbar
      style={{ backgroundColor: "#282828" }}
      className="py-1 justify-content-center"
    >
      <Nav>
        <li class="nav-item" style={{ textIndent: "60px" }}>
          <a
            style={{ color: "white" }}
            class="nav-link active"
            aria-current="page"
            href="/"
          >
            <strong>Home</strong>
          </a>
        </li>
        <li class="nav-item" style={{ textIndent: "60px" }}>
          <a
            style={{ color: "white" }}
            class="nav-link active"
            aria-current="page"
            href="/login"
          >
            <strong>Login</strong>
          </a>
        </li>
        <li class="nav-item" style={{ textIndent: "60px" }}>
          <a
            style={{ color: "white" }}
            class="nav-link active"
            aria-current="page"
            href="/register"
          >
            <strong>Register</strong>
          </a>
        </li>
      </Nav>
    </Navbar>
  );
};

export default Nav2;
