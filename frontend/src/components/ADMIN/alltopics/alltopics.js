import React, { useState, useEffect } from "react";
import axios from "axios";
import '../user.css'
import { Button } from "@material-ui/core";
import { Link} from 'react-router-dom'
import Nav1 from "../AdminNavbar";
import swal from 'sweetalert';

export default function AllTopics(){

    const [topics, setTopics] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

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

    useEffect(()=>{
        function getTopics() {
            axios.get("https://af-backend123.herokuapp.com/student/allTopics").then((res)=>{
                setTopics(res.data);
            }).catch((err)=>{
                alert((err.message));
            })
        }
        getTopics();
    },[])


    return(
        <>
        <Nav1 />
        <div className="container">
        <br/><br/>
        <h1><center> All Accepted Topics </center></h1>
        <br/><br/>

        <div className="row g-3">
        <div className="col-sm-7">
        <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Users" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        </div>


        </div>

        <br></br>
        <br></br>

        <table className="table table-bordered">
        <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th><center> Topic </center></th>
                            <th><center> Group ID </center></th>
                            <th></th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            topics.filter(val=>{
                            
                                    return val.status=="Accept";
                                
                                }).map(function (f) {
                                        return <tr>
                                    <td ><center> {f.topic} </center></td>
                                    <td ><center> {f.groupId} </center></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td ><Link to={"/allocatepm/" + f._id} ><Button type="button" class="btn btn-primary" > Allocate PM </Button></Link></td>
                                        </tr>
        
                                    })
                                }
                            
                    </tbody>
                    </table>
                </table>
                </div>

</>

    )

}