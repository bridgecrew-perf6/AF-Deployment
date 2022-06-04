import React, { useState, useEffect } from "react";
import axios from "axios";
import '../user.css'
import { Button } from "@material-ui/core";
import { Link} from 'react-router-dom'
import swal from 'sweetalert';
import jspdf from 'jspdf'
import 'jspdf-autotable'
import img from '../logo.png';
import Nav1 from "../AdminNavbar";

export default function AllAllocatedPM(){

    const [panelm, setPanelM] = useState([]);
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

    const deleteAllocatePanel=(id) =>{
        swal({
            title: "Are you sure?",
            text: "The Allocated Panel Will be Deleted ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
                if(willDelete){
            axios.delete(`https://af-backend123.herokuapp.com/APannel/deleteAPmember/${id}`).then(()=>{


            if (willDelete) {
              swal({
                title: "The Allocated Panel has been Removed!",
                text: "You can Continue with Your Other Panels.",
                icon:  "success",
                type: "success"
              }).then(function(){
                window.location.href="/allallocatedpanels";
               })
            } else {
              swal("The Allocated Panel Is Not Deleted");
            }
          });
        }
    });
    
    }

    const generatePDF = tickets => {
 
        const doc = new jspdf();
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        const tableColumn = ["Group ID","Topic", "Panel Member"];
        const tableRows = [];
    
        tickets.map(ticket => {
            const ticketData = [
                ticket.groupId,
                ticket.topic,
                ticket.pmember


            ];
            tableRows.push(ticketData);
        })
        doc.text("Allocated Panel Members Report", 14, 15).setFontSize(12);
        doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
        doc.addImage(img, 'JPEG', 170, 8, 22, 22);
        // right down width height
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
        doc.save(`Allocated_Panel_Members_Report.pdf`);
      };

    useEffect(()=>{
        function getPanelM() {
            axios.get("https://af-backend123.herokuapp.com/APannel/allAPmembers").then((res)=>{
                setPanelM(res.data);
            }).catch((err)=>{
                alert((err.message));
            })
        }
        getPanelM();
    },[])


    return(
        <>
        <Nav1 />
        <div className="container">

        <br/><br/>
        <h3><center> All Allocated Panels </center></h3>
        <br/><br/> 

        <Button style={{padding:'Right'}}type="button" class="btn btn-outline-warning" onClick={() =>  generatePDF(panelm)}>Generate Report</Button>

        

        <div className="row g-3">
        <div className="col-sm-7">
        <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Users" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        </div>

        <div className="col-sm">
        <h5>User Count : {panelm.length}</h5>
        </div>
        </div>

        <br/><br/>


        <table className="table table-bordered">
        <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th><center> User Name </center></th>
                            <th><center> NIC </center></th>
                            <th><center> Gender </center></th>
                            <th></th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            panelm.filter(val=>{
                                if (searchTerm === ''){
                                    return val;
                                } else if(

                                     val.groupId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     val.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     val.pmember.toLowerCase().includes(searchTerm.toLowerCase()) 
                                ){
                                    return val;
                                }
                                }).map(function (f) {
                                        return <tr>
                                    <td ><center> {f.groupId} </center></td>
                                    <td ><center> {f.topic} </center></td>
                                    <td ><center> {f.pmember} </center></td>

                                    <td > <Button type="button" class="btn btn-outline-danger" onClick={() =>  deleteAllocatePanel(f._id)}> Delete </Button></td>
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