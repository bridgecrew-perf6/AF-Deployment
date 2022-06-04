import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Nav1 from '../StudentNavbar';

export default function CreateStudentGroup() {
    const [name, setName] = useState("");
    const [member1, setMember1] = useState("");
    const [member2, setMember2] = useState("");
    const [member3, setMember3] = useState("");
    const [member4, setMember4] = useState("");

    async function saveGroup(e) {
        e.preventDefault();

        let members = {
          member1,
          member2,
          member3,
          member4
      }

      const mem1 = members.member1;
      const mem2 = members.member2;
      const mem3 = members.member3;
      const mem4 = members.member4;

        let memberds = `{ "${mem1}": false, "${mem2}": false, "${mem3}": false, "${mem4}": false }`
        console.log(memberds)
        const memberCheck = JSON.parse(memberds)

        // console.log(memberCheck)
        const group = {
          name,
          member1,
          member2,
          member3,
          member4
        }

        axios.post("/api/student/registerGroup", group).then((res) => {
                    Swal.fire("Success", "Group Registered Succesfully", "success").then((res) => {
                      if(res.isConfirmed) {
                        window.location.href = "/studentMain";
                      }
                    })
                }).catch((err) => {
                    alert(err);
                })

        // await checkAllMemberAvailability(memberCheck).then((res) => {
        //     let val = Object.values(memberCheck).every((item) => {
        //         return item === true;
        //     })
            
        //     if(val) {
        //         const group = {
        //             name,
        //             member1,
        //             member2,
        //             member3,
        //             member4
        //         }

        //         axios.post("/api/student/registerGroup", group).then((res) => {
        //             Swal.fire("Success", "Group Registered Succesfully", "success");
        //         }).catch((err) => {
        //             alert(err);
        //         })
        //     }
            
        // }).catch((err) => {
            
        // }) 
    }

    async function validateMember(member) {
      const stud = {
        email: member
      }
      const url = "/api/student/studentinGroup"
      await axios.get(url, stud).then((res) => {
        if(res.data.available) {
          console.log(stud)
          console.log(res)
          Swal.fire("Success", "Student is available", "success");
        }
        else {
          Swal.fire("Oops", "Student is already in another group, please select a member without a group", "error");
        }
      })

    }

    async function checkAllMemberAvailability(memberCheck) {
        return new Promise(async (resolve, reject) => {
            for (var key in memberCheck) {
              await checkAvailability(key)
                console.log(checkAvailability(key));
                if(checkAvailability(key)) {
                    memberCheck[key] = true
                }
                else {
                    Swal.fire("Oops", key+" is already in another group, please select a member without a group", "error");
                    reject();
                }
            }
            
            resolve();
        })
    }

    async function checkAvailability(member) {
      let status;
        const stud = {
          email: member
        }
        const url = "/api/student/studentinGroup/"
        await axios.get(url, stud).then((res) => {
            // console.log(member);
            status = res.data.available;
        })

        return status
    }

    return (
        <>
        <Nav1 />
            <div>
      <div class="card">
        <div class="card-body">
          <center>
            <h1>Register Student Group</h1>
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
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="nic">Member 1 email</label>
              <input
                type="text"
                class="form-control"
                id="nic"
                placeholder="Enter Member 1 email address"
                onChange={(e) => {
                  setMember1(e.target.value);
                }}
                required
              />
              <button type="button" class="btn btn-outline-success" onClick={()=>validateMember(member1)}>Validate</button>
            </div>
            <br />
            <div class="form-group">
              <label for="gender">Member 2 email</label>
              <input
                type="text"
                class="form-control"
                id="gender"
                placeholder="Enter Member 2 email address"
                onChange={(e) => {
                  setMember2(e.target.value);
                }}
                required
              />
              <button type="button" class="btn btn-outline-success" onClick={()=>validateMember(member2)}>Validate</button>
            </div>
            <br />
            <div class="form-group">
              <label for="contactNo">Member 3 email</label>
              <input
                type="text"
                class="form-control"
                id="contactNo"
                placeholder="Enter Member 3 email address"
                onChange={(e) => {
                  setMember3(e.target.value);
                }}
                required
              />
              <button type="button" class="btn btn-outline-success" onClick={()=>validateMember(member3)}>Validate</button>
            </div>
            <br />
            <div class="form-group">
              <label for="email">Member 4 email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter Member 4 email address"
                onChange={(e) => {
                  setMember4(e.target.value);
                }}
                required
              />
              <button type="button" class="btn btn-outline-success" onClick={()=>validateMember(member4)}>Validate</button>
            </div>

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