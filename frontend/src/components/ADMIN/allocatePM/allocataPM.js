import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav1 from "../AdminNavbar";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

export default function AllocatePM() {
  const { id } = useParams();

  const [groupId, setGroupId] = useState("");
  const [topic, setTopic] = useState("");
  const [pmember, setPmember] = useState("");

  const [acceptedtopics, setAcceptedtopics] = useState([]);
  const [getpanelMembers, setgetPanelMembers] = useState([]);

  const handelLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  function sendData(e) {
    e.preventDefault();

    const newAllocatePM = {
      groupId,
      topic,
      pmember,
    };

    axios
      .post(`https://af-backend123.herokuapp.com/APannel/allocatePM`, newAllocatePM)
      .then((willallocate) => {
        if (willallocate) {
          swal({
            title: "Success",
            text: "Pannel Member Allocated Successfully ",
            icon: "success",
            type: "success",
          }).then(function () {
            window.location.href = "/allallocatedpanels";
          });
        } else {
          swal("Allocating Pannel Members Failed!");
        }
      });
  }

  useEffect(() => {
    var userData = localStorage.getItem("user");

    if (!userData) {
      handelLogout();
    }

    axios
      .get(`https://af-backend123.herokuapp.com/student/getTopicById/${id}`)
      .then((res) => {
        console.log(res.data);
        setAcceptedtopics(res.data);
        setTopic(res.data.topic)
        setGroupId(res.data.groupId)
      })
      .catch((e) => {
        console.log(e);
        console.log(id);
      });

    axios
      .get("https://af-backend123.herokuapp.com/user/allPanel")
      .then((res) => {
        if (res.data.length > 0) {
          setgetPanelMembers(res.data.map((user) => user.name));
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  }, []);

  return (
    <>
      <Nav1 />
      <div className="container">
        <form onSubmit={sendData}>
          <br />
          <center>
            <h1>Allocate Pannel Members</h1>
          </center>
          <br />
          <div class="form-group">
            <label for="groupId">Group ID </label>
            <input
              type="text"
              class="form-control"
              id="groupId"
              defaultValue={acceptedtopics.groupId}
              onChange={(e) => {
                setGroupId(e.target.value);
              }}
              readOnly
            />
          </div>
          <br />
          <div class="form-group">
            <label for="topic">Topic</label>
            <input
              type="text"
              class="form-control"
              id="topic"
              defaultValue={acceptedtopics.topic}
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              readOnly
            />
          </div>
          <br />
          <div class="form-group">
            <label for="submissionType">Panel Member</label>
            <select
              type="text"
              class="form-control"
              id="submissionType"
              onChange={(e) => {
                setPmember(e.target.value);
              }}
              required
            >
              <option></option>
              {getpanelMembers.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
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
