import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav1 from '../StudentNavbar';

export default function CheckTopicStatus() {
  const [rerequest, setReRequest] = useState(false);
  const [group, setGroup] = useState("");
  const [research, setResearch] = useState("");

  async function getStudentGroup() {
    const email = JSON.parse(localStorage.getItem("user")).email;
    await axios
      .get(`https://af-backend123.herokuapp.com/student/getGroup/${email}`)
      .then((res) => {
        setGroup(res.data);
        // console.log(res.data.name)
        getResearch(res.data.name);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function checkRejected() {
    if(research.status == "Reject") {
      setReRequest(true);
    }
  }


  const SetButton = () => (
    <div>
    <Link to={"/rerequestTopic/" + research._id}>
        <button
          class="btn btn-danger me-5 ms-5 rounded-pill"
        >
          Re-Request Topic
        </button>
      </Link>
      </div>
  );

  async function getResearch(groupName) {
    await axios
      .get(`https://af-backend123.herokuapp.com/student//getResearchByGroup/${groupName}`)
      .then((res) => {
        console.log(res.data);
        setResearch(res.data);
      });
  }

  useEffect(() => {
    getStudentGroup();
  }, []);

  useEffect(() => {
    checkRejected();
  }, [research]);

  return (
    <>
      <Nav1/>
      <div>
        <br />
        <br />
        <card class="card me-5 ms-5 mb-14">
          <h1>{research.topic}</h1>
          <br />
          <br />
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <table className="table-borderless">
                  <tbody>
                    <tr>
                      <td>Supervisor -</td>
                      <td>
                        <h4>{research.supervisor}</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-sm">
                <table className="table-borderless">
                  <tbody>
                    <tr>
                      <td>Status -</td>
                      <td>
                        <h4>{research.status}</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <Link to={"/requestCoSupervisor/" + research._id}>
                  <button
                    class="btn btn-success me-5 ms-5 rounded-pill"
                    disabled={
                      research.status == "pending" ||
                      research.status == "Reject"
                    }
                  >
                    Request Co-Supervisor
                  </button>
                </Link>
              </div>
              <div className="col-sm">
                <Link to={"/submitDoc/" + research._id}>
                  <button
                    class="btn btn-success me-5 ms-5 rounded-pill"
                    disabled={
                      research.status == "pending" ||
                      research.status == "Reject"
                    }
                  >
                    Submit Document
                  </button>
                </Link>
              </div>
              <div className="col-sm">
                  {
                    rerequest ? <SetButton /> : null
                  }
              </div>
            </div>
          </div>
        </card>
      </div>
    </>
  );
}
