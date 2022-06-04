import React, { Component } from 'react'
//import axios
import axios from 'axios';

export default class SupEvaluation extends Component {
  
  //initialize constructor to pass the props
  constructor (props) {
    super(props);
    this.state={
      //initializing an array 
      GetAllposts:[]
    };
  }
  
 //calling the method after componenets render to the page
 componentDidMount(){
  this.retrievePanelEve();
}


  //get request method
  retrievePanelEve(){
      axios.get("/api/supEve/GetAlldetails").then(res=>{
        console.log(res.data);
       
        if(res.data.success){
          this.setState({
            GetAllposts:res.data.existingDocs
          });
          console.log(this.state.GetAllposts)
        }
      })
  }

   
 //delete function

 onDelete = (id)=>{
  axios.delete(`/api/supEve/delete/${id}`).then((res)=>{

    

    this.retrievePanelEve();
  })
  alert("Deleted succesfully");
} 
  

//search data according to name

filterData(GetAllposts,searchKey){
  const result =GetAllposts.filter((CheckOnePEv)=>
  CheckOnePEv.Groupname.toLowerCase().includes(searchKey) ||
  CheckOnePEv.Groupname.includes(searchKey)


  )

this.setState({GetAllposts:result})

}


handleSearchArea=(e)=>{

  const searchKey = e.currentTarget.value;
  
  axios.get("/api/supEve/GetAlldetails").then(res=>{
  if(res.data.success){
  
    this.filterData(res.data.existingDocs,searchKey)
  }
});

}
 
  
  render() {
    return (
      <div >
          
         
            <div >
              <center>
              <h1 >Supervisor Document Evaluvation</h1>
              <br></br><br></br>
              </center>  


              <div  >
              
              <input
              className="form-control" style={{ marginLeft:'250px',width:'300px',float:'left'}}
              type="search"
              placeholder="Search Group Name"
              name="searchQuery"
              onChange={this.handleSearchArea}>
                </input>

                <button className='btn btn-success' style={{marginLeft:'400px', backgroundColor:"green"}}>
                    <a href="/SupEvaAdd" style={{textDecoration:'none', color:'white', fontSize:"16px"}}> Evluate New Document </a>
                  </button>   
              </div>
              <br></br>





              <table className='table' style={{width:'1000px', marginLeft:"250px"}}>
                <tr style={{fontSize:"20px"}}>
                  <th scope='col' >No</th>
                  <th scope='col'> Group Name </th>
                  <th scope='col'>Marks</th>
                </tr>
                <tbody>
                {this.state.GetAllposts.map((GetAllposts,index)=>(
                    <tr key ={index}>
                      <th scope='row'>{index+1}</th>
                      
                      <td>{GetAllposts.Groupname} </td>  
                      <td>{GetAllposts.Total}</td> 
                      <td></td>
                      <td>
                      <a className='btn btn-info' href={`/SupEvaOneDetail/${GetAllposts._id}`}>
                      <i className='fas fa-info'></i>&nbsp; View
                    </a>
                    &nbsp;
                      <a className='btn btn-warning' href={`/SupEvaEdit/${GetAllposts._id}`}>
                      <i className='fas fa-edit'></i>&nbsp; Update
                    </a>
                    &nbsp;
                    <a className='btn btn-danger' href='#'onClick={()=>this.onDelete(GetAllposts._id)}>
                      <i className='far fa-trash-alt'></i>&nbsp; Delete
                    </a>
                    </td>
                    </tr>
                    ))}
             </tbody>

             </table>  
             <br></br>
             
                  <button className="btn btn-success" 
                  style={{marginLeft:'1000px',padding:'8px 8px',backgroundColor:'#3895d3'}}>
                    <a href="/SupHome" style={{textDecoration:'none',backgroundColor:'#3895d3',color:'white',fontSize:'16px'}}> 
                    <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Previous</a>
                  </button>
               
           
                 

               </div>
             
             
       
              
      


      </div>
    )
  }
}