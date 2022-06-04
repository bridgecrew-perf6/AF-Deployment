import React, { Component } from 'react'
import axios from 'axios';
export default class SupEvaAdd extends Component {
 
 constructor(props){
  super(props) 
  
  this.state={
    Groupname:"",
    title:"",
    abstract:"",
    problemIdentified:"",
    clearyStated:"",
    references:"",
    modelframework:"",
    MethoDescription:"",
    appro:"",
    dataCollect:"",
    dataAnalys:"",
    conclusionClarity:"",
    relevent:"",
    clearWritten:"",
    logic:"",
    Total:"",
    Comment:"",
  }
 }
 //handleChange = ({
    //target: { value, name }}) => 
    //this.setState({ [name]: value
      
    
    // })

    handleChange= (e)=>{
      const {name,value} = e.target;
      let nam = e.target.name;
      let val = e.target.value;
  
     
  
   //validation for abstract 
    if (nam=== "abstract") {
          
      if (!Number(val)) {
        alert("Marks must be a number");
      }
    }
    if(nam==="abstract"){
      if(val > 5){
          alert("Invalid mark!!");
      }
  }

  //validation for problem identify
  
  if (nam=== "problemIdentified") {
          
    if (!Number(val)) {
      alert("Marks must be a number");
    }
  }
  if(nam==="problemIdentified"){
    if(val > 5){
        alert("Invalid mark!!");
    }
}

//clearly stated validation

if (nam=== "clearyStated") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="clearyStated"){
  if(val > 5){
      alert("Invalid mark!!");
  }
}

//references validation

if (nam=== "references") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="references"){
  if(val > 5){
      alert("Invalid mark!!");
  }
}

//model framework validation

if (nam=== "modelframework") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="modelframework"){
  if(val > 10){
      alert("Invalid mark!!");
  }
}

//description validation

if (nam=== "MethoDescription") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="MethoDescription"){
  if(val > 5){
      alert("Invalid mark!!");
  }
}
      
//appropriate validation

if (nam=== "appro") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="appro"){
  if(val > 5){
      alert("Invalid mark!!");
  }
}

//data collection validation

if (nam=== "dataCollect") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="dataCollect"){
  if(val > 5){
      alert("Invalid mark!!");
  }
}

//data analysis validation


if (nam=== "dataAnalys") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="dataAnalys"){
  if(val > 15){
      alert("Invalid mark!!");
  }
}

//conclusion clearity

if (nam=== "conclusionClarity") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="conclusionClarity"){
  if(val > 10){
      alert("Invalid mark!!");
  }
}

//relevant validation


if (nam=== "relevent") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="relevent"){
  if(val > 10){
      alert("Invalid mark!!");
  }
}

//clearly written validation

if (nam=== "clearWritten") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="clearWritten"){
  if(val > 10){
      alert("Invalid mark!!");
  }
}



//logic validation

if (nam=== "logic") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="logic"){
  if(val > 10){
      alert("Invalid mark!!");
  }
}

//total mark validation

if (nam=== "Total") {
          
  if (!Number(val)) {
    alert("Marks must be a number");
  }
}
if(nam==="Total"){
  if(val > 100){
      alert("Invalid mark!!");
  }
}


      this.setState({
          ...this.state,
          [name]:value
      })
  }
  


onSubmit=(e)=>{
  e.preventDefault();

  const {Groupname,title,abstract,problemIdentified,clearyStated,references,modelframework,
     MethoDescription,appro,dataCollect,dataAnalys,conclusionClarity,relevent,clearWritten,logic,Total,Comment} = this.state;

  const data={
    Groupname:Groupname,
    title:title,
    abstract:abstract,
    problemIdentified: problemIdentified,
    clearyStated:clearyStated,
    references: references,
    modelframework:modelframework,
    MethoDescription:MethoDescription,
    appro:appro,
    dataCollect:dataCollect,
    dataAnalys:dataAnalys,
    conclusionClarity:conclusionClarity,
    relevent:relevent,
    clearWritten:clearWritten,
    logic:logic,
    Total:Total,
    Comment:Comment
      
  }

  console.log(data)


  //save data
  axios.post("https://af-backend123.herokuapp.com/supEve/saveDetails",data).then((res) =>{
    if(res.data.success){
      this.setState(
        {
          Groupname:"",
          title:"",
          abstract:"",
          problemIdentified:"",
          clearyStated:"",
          references:"",
          modelframework:"",
          MethoDescription:"",
          appro:"",
          dataCollect:"",
          dataAnalys:"",
          conclusionClarity:"",
          relevent:"",
          clearWritten:"",
          logic:"",
          Total:"",
          Comment:""

        }
      )
      alert("You are saving the details");
    } 
  })
 
}
 
 
 
 
  render() {
    return (
      

<div className="edit" style={{ backgroundColor:"#FFE9EE"}}>
       
       <div className="col-md-8 mt-4 mx-auto" >
       <div style={{height:'80px', width:'100%', marginTop:'-20px'}}>
               <br/>
               <h1 style={{textAlign:'center'}}>Document Evaluation</h1>
              <br/>
     </div>
           <br/>
           <div >
             <br/>
           
           <form className="row g-3" style={{backgroundColor:"#ebecf0"}}>

           <div className="form-group" >
                 
                   <label  className="form-label" >Group Name : </label>
                   <input type="text" 
                   className="form-control" 
                   name="Groupname"  
                   value={this.state.Groupname} 
                   placeholder="Group Name" 
                   onChange={this.handleChange} required>

                   </input>
               
               </div>

               <div className="form-group" >
                 
                   <label  className="form-label" >Research Topic : </label>
                   <input type="text"
                    className="form-control" 
                    name="title"  
                    value={this.state.title} 
                    placeholder="Topic" 
                    onChange={this.handleChange} required>
            
                    </input>
                    
                    <hr></hr>
               </div>
              
               <div className="form-group">
               <h4> Research Hypothesis (15 Marks)</h4>
                   <label  className="form-label" >Abstract : (5 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="abstract"
                  value={this.state.abstract} 
                  placeholder="0" 
                  onChange={this.handleChange} required/>
               </div>


               <div className="form-group">
                   <label  className="form-label">Problem Identified Clearly : (5 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="problemIdentified" 
                   value={this.state.problemIdentified} 
                   placeholder="0" 
                   onChange={this.handleChange} required/>
               </div>

               <div className="form-group">
                   <label  className="form-label">Research Area Clearly Stated : (5 marks)</label>
                   <input type="email" 
                   className="form-control" 
                   name="clearyStated" 
                   value={this.state.clearyStated} 
                   placeholder="0" 
                   onChange={this.handleChange} required/>
               </div>

               <div className="form-group">
                 <h4>Literature Review (15 Marks)</h4>
                   <label  className="form-label">References : (5 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="references" 
                   value={this.state.references} 
                   placeholder="0" 
                   onChange={this.handleChange} />
                    
               
               </div>
              
               <div className="form-group">
                   <label  className="form-label">Model Framwork : (10 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="modelframework" 
                   value={this.state.modelframework} 
                   placeholder="0" 
                   onChange={this.handleChange} />
               </div>

                
               <div className="form-group">
                 <h4>Methodology (15 Marks)</h4>
                   <label  className="form-label">Description : (5 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="MethoDescription" 
                   value={this.state.MethoDescription} 
                   placeholder="0" 
                   onChange={this.handleChange} />
               </div>
               
                
               <div className="form-group">
                   <label className="form-label">Appropriation : (5 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="appro" 
                   value={this.state.appro} 
                   placeholder="0" 
                   onChange={this.handleChange} />
               </div>
               

                
               <div className="form-group">
                   <label  className="form-label">Data Collection Methods : (5 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="dataCollect" 
                   value={this.state.dataCollect} 
                   placeholder="0" 
                   onChange={this.handleChange} />
                   
               </div>

               <div className="form-group">
               <h4>Data Analysis (15 Marks)</h4>
                   <label className="form-label">Data Analsing Methods : (15 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="dataAnalys" 
                   value={this.state.dataAnalys} 
                   placeholder="0" 
                   onChange={this.handleChange} />
                   
               </div>

               <div className="form-group">
                 <h4>Conclusion (20 Marks)</h4>
                   <label  className="form-label">Clearity of Conclusion : (10 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="conclusionClarity" 
                   value={this.state.conclusionClarity} 
                   placeholder="0" 
                   onChange={this.handleChange} />
                   
               </div>

               <div className="form-group">
                   <label  className="form-label">Relevent : (10 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="relevent" 
                   value={this.state.relevent} 
                   placeholder="0" 
                   onChange={this.handleChange} />
                   
               </div>

               <div className="form-group">
                 <h4>Report Writing (20 Marks)</h4>
                   <label  className="form-label">Clearly Written : (10 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="clearWritten" 
                   value={this.state.clearWritten} 
                   placeholder="0" 
                   onChange={this.handleChange} />
                   
               </div>

               <div className="form-group">
                   <label  className="form-label">Logical Organized : (10 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="logic" 
                   value={this.state.logic} 
                   placeholder="0" 
                   onChange={this.handleChange} />
                   
               </div>

               <div className="form-group">
                 
                   <label  className="form-label">Total Mark : (100 marks)</label>
                   <input type="text" 
                   className="form-control" 
                   name="Total" 
                   value={this.state.Total} 
                   placeholder='0' 
                   onChange={this.handleChange} />
                   
               </div>

               <div className="form-group">
                 
                 <label  className="form-label">Feedback : </label>
                 <textarea 
                 className="form-control" 
                 name="Comment" 
                 value={this.state.Comment} 
                 placeholder="Give a feedback comment" 
                 onChange={this.handleChange} />
                 
             </div>
               
           </form>
               <div>
                   <hr/>
                   <center>
                   <button className="btn btn btn-dark btn-lg" style={{backgroundColor:"#0147ab"}} onClick={this.onSubmit} href="/"> Submit </button>&nbsp;

                        <button className="btn btn-success" 
                        style={{marginLeft:'890px',padding:'8px 8px',backgroundColor:'#3895d3', marginBottom:"10px"}}>
                        <a href="/Supevalution" style={{textDecoration:'none',backgroundColor:'#3895d3',color:'white',fontSize:'16px'}}> 
                        <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Previous</a>
                        </button>
                  
                   </center>
                
                   

               
               </div>


               </div>
               
       </div>
       </div>





    )
  }
}
