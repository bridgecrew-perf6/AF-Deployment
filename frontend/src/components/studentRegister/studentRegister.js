import React, { useState } from "react";
import axios from "axios";

export default function StudentRegister() {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function sendData(e) {
    e.preventDefault();

    const newStudent = {
      name,
      nic,
      gender,
      contactNo,
      email,
      password,
    };
 
    axios
        .post("/api/student/registerStudent", newStudent)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/studentMain";
        })
        .catch((err) => {
          alert(err);
        });
  }

  return (
    <div>
      <div class="card">
        <div class="card-body">
          <center>
            <h1>Register Student</h1>
          </center>
          <form onSubmit={sendData}>
            <br />
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="nic">NIC</label>
              <input
                type="text"
                class="form-control"
                id="nic"
                placeholder="Enter NIC"
                onChange={(e) => {
                  setNIC(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="gender">Gender</label>
              <input
                type="text"
                class="form-control"
                id="gender"
                placeholder="Enter the Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="contactNo">Contact No</label>
              <input
                type="text"
                class="form-control"
                id="contactNo"
                placeholder="Enter Contact No"
                onChange={(e) => {
                  setContactNo(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="email">Email </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
