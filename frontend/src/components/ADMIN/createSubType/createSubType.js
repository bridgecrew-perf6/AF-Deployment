import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav1 from "../AdminNavbar";

export default function CreateSubType() {

  const [subName,setSName] = useState("");
  const [submissionType,setSType] = useState("");
  const [deadline,setDeadline] = useState("");
  const [explainST,setExplainST] = useState("");

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

  function sendData(e){

    e.preventDefault();

    const newSubType = {
        subName,
        submissionType,
        deadline,
        explainST,
    }

    axios.post("https://af-backend123.herokuapp.com/subtype/createSubType",newSubType).then((willcreate)=>
    {
        if(willcreate){
        swal({
          title: "Success",
          text: "Submission Type Successfully Created",
          icon:  "success",
          type: "success"
        }).then(function(){
          window.location.href="/allsubTypes";
        })
      } else{
        swal("Create Submission Type Failed!");
      }
    })
    

  }

  return (
    <>
    <Nav1 />
    <div className="container">
      <form onSubmit={sendData}>
        <br/>
        <center><h1>Create Submission Type</h1></center>
        <br/>
        <div class="form-group">
          <label for="subName">Submission Name</label>
          <input
            type="text"
            class="form-control"
            id="subName"
            placeholder="Enter Submission Name"
            onChange={(e)=>{
              setSName(e.target.value);
            }}
            required/>
        </div>
        <br />
        <div class="form-group">
          <label for="submissionType">Submission Type</label>
          <select
            type="text"
            class="form-control"
            id="submissionType"
            placeholder="Enter Submission Type"
            onChange={(e)=>{
              setSType(e.target.value);
            }}
            required>
            <option selected></option>
            <option >File Submission</option>
            <option >Text Submission</option>
            <option >On Paper Submission</option>
            <option >Observed In Person</option>
            </select>
        </div>
        <br />
        <div class="form-group">
          <label for="deadline">Deadline</label>
          <input
            type="date"
            class="form-control"
            id="deadline"
            onChange={(e)=>{
              setDeadline(e.target.value);
            }}
            required/>
        </div>
        <br />
        <div class="form-group">
          <label for="explainST">Explain Submission Type</label>
          <textarea
            type="text"
            class="form-control"
            id="explainST"
            placeholder="Explain the Submission Type"
            onChange={(e)=>{
              setExplainST(e.target.value);
            }}
            required/>
        </div>
        <br />
        

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </>
  );
}
