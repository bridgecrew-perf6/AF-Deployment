import React from 'react'
import moment from "moment"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import './landing.css'
import Nav2 from '../login/loginNavbar';

AOS.init({
      duration: '2000'
});

const LandingScreen = () => {
      return (
          <>
          <Nav2 />
            <div className="">
                  <div className="landing row justify-content-center text-center bg-image">
                        <div className="col-md-9 my-auto" style={{ borderRight: '8px solid white' }}>
                              <h2 style={{ color: "white",fontSize: "110px" }} data-aos='zoom-in'>Research Management System</h2>
                              <h1 style={{ color: "white" }} data-aos='zoom-out' >The Easiest Way to Manage Your Research.</h1>
                              <Link to="/login">
                                    <button button type="button" class="btn btn-success">Get Started</button>
                              </Link>
                        </div>



                  </div>

            </div>
            </>
      );
}

export default LandingScreen