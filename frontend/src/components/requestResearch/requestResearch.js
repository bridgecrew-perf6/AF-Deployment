import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";
import Nav1 from '../StudentNavbar';

export default function RequestResearch() {
    const [users, setUsers] = useState([]);
    const [groupId, setGroupId] = useState("");
    const [topic, setTopic] = useState("");
    const [supervisor, setSupervisor] = useState("");

    function getUsers() {
        axios.get("/api/user/allusers").then((res)=>{
            setUsers(res.data);
        }).catch((err)=>{
            alert((err.message));
        })
    }
    getUsers();

    const setSupervisorFromForm=(val) =>  {
        setSupervisor(val);
        // console.log(supervisor)
    }

    async function saveGroup() {
        const status = "pending"
        const ReqTopic = {
            topic,
            groupId,
            supervisor,
            status
        }
        await axios.post("/api/student/registerTopic", ReqTopic).then((res) => {
            Swal.fire("Success", "Topic Reguested Succesfully", "success").then((result) => {
                if(result.isConfirmed) {
                    window.location.href = "/studentMain";
                }
            })
        }).catch((err) => {
            Swal.fire("Oops", "Something went wrong, please try again", "error");
        })
    }

    return (
        <>
        <Nav1 />
            <div>
            <div class="card">
        <div class="card-body">
          <center>
            <h1>Request Research Topic</h1>
          </center>
          <form onSubmit={saveGroup}>
            <br />
            <div class="form-group">
              <label for="name">Name of the Group</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Enter Name of the Group"
                onChange={(e) => {
                    setGroupId(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="nic">Research Topic</label>
              <input
                type="text"
                class="form-control"
                id="nic"
                placeholder="Enter Research Topic"
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                required
              />
            </div>
            <br/><br/>

            <table className="table table-bordered">
            <table className="table table-hover" >
                <thead>
                    <tr>
                        <th><center>Supervisors</center></th>
                        <th><center>Supervisor Email</center></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.filter(val => {
                            
                            {
                                return val.type === 'SUPERVISOR';
                            }
                        }).map(function(f) {
                            return <tr>
                                <td ><center> {f.name} </center></td>
                                <td ><center> {f.email} </center></td>
                                <td>
                                <Button type="button" class="btn btn-outline-success" onClick={() => setSupervisorFromForm(f.name)}>Request</Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </table>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
            </div>
        </>
    )
}