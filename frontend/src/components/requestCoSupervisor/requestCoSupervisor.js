import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Nav1 from '../StudentNavbar';

export default function RequestCoSupervisor() {
    const { id } = useParams();

    const [users, setUsers] = useState([]);
    const [research, setResearch] = useState("");
    const [groupId, setGroupId] = useState("");
    const [topic, setTopic] = useState("");
    const [coSupervisor, setCoSupervisor] = useState("");

    function getUsers() {
        axios.get("https://af-backend123.herokuapp.com/user/allusers").then((res)=>{
            setUsers(res.data);
        }).catch((err)=>{
            alert((err.message));
        })
    }
    getUsers();

    const setSupervisorFromForm=(val) =>  {
        setCoSupervisor(val);

        const coSupSave = {
            id,
            coSupervisor
        }
        axios.post("https://af-backend123.herokuapp.com/student/assingCoSup", coSupSave).then((res) => {
            Swal.fire("Success", "CoSupervisor requested successfully", "success").then(() => {
                window.location.href = "/studentMain";
            })
        })
        // console.log(supervisor)
    }

    function getResearch() {
        axios.get(`https://af-backend123.herokuapp.com/student/getResearchById/${id}`).then((res) => {
            setResearch(res.data);
        })
    }

    useEffect(() => {
        getResearch();
    }, [])


    return (
        <>
        <Nav1 />
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
          <br/><br/>

            <table className="table table-bordered">
            <table className="table table-hover" >
                <thead>
                    <tr>
                        <th><center>Co-Supervisors</center></th>
                        <th><center>Co-Supervisor Email</center></th>
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
        </card>
            </div>
        </>
    )
}