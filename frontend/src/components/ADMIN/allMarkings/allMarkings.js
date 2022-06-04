import React, { useState, useEffect } from "react";
import axios from "axios";
import '../user.css'
import { Button } from "@material-ui/core";
import { Link} from 'react-router-dom'
import Nav1 from "../AdminNavbar";
import swal from 'sweetalert';

export default function AllMarkings(){

    const [markings, setMarkings] = useState([]);
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

    const deleteMarking=(id) =>{
        swal({
            title: "Are you sure?",
            text: "The Marking Will be Deleted ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
                if(willDelete){
            axios.delete(`/api/marking/deleteMarking/${id}`).then(()=>{


            if (willDelete) {
              swal({
                title: "The Marking has been Removed!",
                text: "You can Continue with Your Other Markings.",
                icon:  "success",
                type: "success"
              }).then(function(){
                window.location.href="/allMarkings";
               })
            } else {
              swal("Request Is Not Deleted");
            }
          });
        }
    });
    
    }

    useEffect(()=>{
        function getMarkings() {
            axios.get("/api/marking/allMarkings").then((res)=>{
                setMarkings(res.data);
            }).catch((err)=>{
                alert((err.message));
            })
        }
        getMarkings();
    },[])


    return(
        <>
        <Nav1 />
        <div className="container">

        <br/><br/>
        <h1><center> All Marking Schemes </center></h1>
        <br/><br/>

        <Link to={"/createMarking"} ><Button type="button" class="btn btn-primary" > Add New </Button></Link>

        <div className="row g-3">
        <div className="col-sm-7">
        <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Users" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        </div>

        <div className="col-sm">
        <h5>Marking Scheme Count : {markings.length}</h5>
        </div>
        </div>

        <br></br>
        <br></br>

        <table className="table table-bordered">
        <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th><center> Assignment Name </center></th>
                            <th><center> Overall Marks </center></th>
                            <th></th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            markings.filter(val=>{
                                if (searchTerm === ''){
                                    return val;
                                } else if(
                                     
                                     val.assignmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     val.overallMark.toLowerCase().includes(searchTerm.toLowerCase())


                                ){
                                    return val;
                                }
                                }).map(function (f) {
                                        return <tr>
                                    <td ><center> {f.assignmentName} </center></td>
                                    <td ><center> {f.overallMark} </center></td>
                                    <td > <Button type="button" class="btn btn-outline-danger" onClick={() =>  deleteMarking(f._id)}> Delete </Button></td>
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