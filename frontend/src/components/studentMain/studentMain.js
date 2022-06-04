import React, { useState } from "react";
import axios from "axios";

export default function StudentMain() {
  const userC = JSON.parse(localStorage.getItem("user"));
  console.log("userC = ");
  console.log(userC);

  function studentGroup() {
    window.location.href = "/groupRegister";
  }

  function registerResearch() {
    window.location.href = "/checkTopicStatus";
  }

  function requestSupervisor() {
    window.location.href = "/requestTopic";
  }

  return (
    <>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-sm">
          <button
          type="button"
          class="btn btn-info buttonClass"
          onClick={studentGroup}
        >
          CREATE STUDENT GROUP
        </button>
          </div>
          <div className="col-sm">
          <button
          type="button"
          class="btn btn-info buttonClass"
          onClick={registerResearch}
        >
          CHECK TOPIC STATUS
        </button>
          </div>
          <div className="col-sm">
          <button
          type="button"
          class="btn btn-info buttonClass"
          onClick={requestSupervisor}
        >
          REQUEST SUPERVISOR
        </button>
          </div>
        </div>
        
        <br />
        </div>
        <br />
        <br />
    </>
  );
}
