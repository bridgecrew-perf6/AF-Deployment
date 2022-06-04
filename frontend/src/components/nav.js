import React, { useState, useEffect } from "react";
import "./nav.css";
import { NavDropdown } from "react-bootstrap";
import logo from './ADMIN/logo.png'

function Nav() {
  const [userInfo, setUserinfo] = useState("");

  const handleRedirectUser = (type) => {
    if (type == "ADMIN") {
      window.location.replace("/adminview");
    } else if (type == "STUDENT") {
      window.location.replace("/studentview");
    } else if (type == "STAFF") {
      window.location.replace("/staffview");
    }
  };

  const handelLogout = () => {
    localStorage.clear();
    swal({
      title: "Success",
      text: "Admin Login Successfully",
      icon:  "success",
      type: "success"
    }).then(function(){
      window.location.href = "/login";
    })
    
  };

  useEffect(() => {
    var userData = localStorage.getItem("user");

    if (userData) {
      setUserinfo(JSON.parse(userData));
      handleRedirectUser(userData.type);
    }
  }, []);

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3 ">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
        <img  src={logo} style={{ width: '70px', height: '70px' }}></img> Research Management System </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            {userInfo ? (
              <NavDropdown
                className="link text-white"
                title={userInfo.name}
                id="username"
              >
                <NavDropdown.Item onClick={handelLogout}>
                  <li className="link">logout</li>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/login">
                  <i class="fa fa-user-circle" aria-hidden="true"></i> Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
