import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav1 from "../AdminNavbar";
import swal from 'sweetalert';

export default function UpdateUser() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const [users, setUser] = useState([]);

  const handelLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    var userData = localStorage.getItem("user");

    if (!userData) {
      handelLogout();
    }
  }, []);

  useEffect(() => {
    axios
      .get(`/api/user/get/${id}`)
      .then((res) => {
        var user = res.data;

        setUser(user);

        setName(user.name);
        setNIC(user.nic);
        setGender(user.gender);
        setContactNo(user.contactNo);
        setEmail(user.email);
        setPassword(user.password);
        setType(user.type);
      })
      .catch((e) => {
        console.log(e);
        console.log(id);
      });
  }, []);

  function updateData(e) {
    e.preventDefault();

    const newUser = {
      name,
      nic,
      gender,
      contactNo,
      email,
      password,
      type,
    };

    axios.put(`/api/user/update/${id}`, newUser)
      .then((willUpdate) => {
        if(willUpdate){
          swal({
            title: "Success",
            text: "User Successfully Updated",
            icon:  "success",
            type: "success"
          }).then(function(){
            window.location.href="/allusers";
          })
        } else{
          swal("Update User Failed!");
        }
      })
  }

  return (
    <>
    <Nav1 />
    <div className="container">
      <form onSubmit={updateData}>
        <br />
        <center>
          <h1>Update User</h1>
        </center>
        <br />
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            defaultValue={users.name}
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
            defaultValue={users.nic}
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
            defaultValue={users.gender}
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
            defaultValue={users.contactNo}
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
            defaultValue={users.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="type">User Type</label>
          <input
            type="text"
            class="form-control"
            id="type"
            defaultValue={users.type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            required
          />
        </div>
        <br />

        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </form>
    </div>
    </>
  );
}
