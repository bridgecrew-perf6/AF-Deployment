import React  from 'react';
import {useState ,useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";



export default function SupEvaEdit()  {

  const[Groupname, setGroupname] = useState("");
  const[title , settitle] = useState("");
  const[abstract, setabstract] = useState("");
  const[problemIdentified, setproblemIdentified] = useState("");
  const[clearyStated, setclearyStated] = useState("");
  const[references, setreferences] = useState("");
  const[modelframework, setmodelframework] = useState("");
  const[MethoDescription, setMethoDescription] = useState("");
  const[appro, setappro] = useState("");
  const[dataCollect, setdataCollect] = useState("");
  const[dataAnalys, setdataAnalys] = useState("");
  const[conclusionClarity, setconclusionClarity] = useState("");
  const[relevent, setrelevent] = useState("");
  const[clearWritten, setclearWritten] = useState("");
  const[logic, setlogic] = useState("");
  const[Total, setTotal] = useState("");
  const[Comment,setComment]=useState("");
  
    
    const id = useParams();
    

  

    const [paneleve] = useState({
        
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
      })

      const changeOnClick = async (e) =>{
        e.preventDefault();
   
        console.log("data");
       
        const formData = new FormData();
   
        formData.append("Groupname",Groupname);
        formData.append("title",title);
        formData.append("abstract",abstract);
        formData.append("problemIdentified",problemIdentified);
        formData.append("clearyStated",clearyStated); 
        formData.append("references",references);
        formData.append("modelframework",modelframework);
        formData.append("MethoDescription",MethoDescription);
        formData.append("appro",appro);
        formData.append("dataCollect",dataCollect);
        formData.append("dataAnalys",dataAnalys);
        formData.append("conclusionClarity",conclusionClarity);
        formData.append("relevent",relevent);
        formData.append("clearWritten",clearWritten);
        formData.append("logic",logic);
        formData.append("Total",Total);
        formData.append("Comment",Comment);
        
        
      
   
        setGroupname("");
        settitle("");
        setabstract("");
        setproblemIdentified("");
        setclearyStated("");
        setreferences("");
        setmodelframework("");
        setMethoDescription("");
        setappro("");
        setdataCollect("");
        setdataAnalys("");
        setconclusionClarity("");
        setrelevent("");
        setclearWritten("");
        setlogic("");
        setTotal("");
        setComment("");
        
        
        
        console.log(formData.get('Groupname')); 

      
        paneleve.Groupname=formData.get('Groupname');
        paneleve.title=formData.get('title');
        paneleve.abstract=formData.get('abstract');
        paneleve.problemIdentified=formData.get('problemIdentified');
        paneleve.clearyStated=formData.get('clearyStated');
        paneleve.references=formData.get('references');
        paneleve.modelframework=formData.get('modelframework');
        paneleve.MethoDescription=formData.get('MethoDescription');
        paneleve.appro=formData.get('appro');
        paneleve.dataCollect=formData.get('dataCollect');
        paneleve.dataAnalys=formData.get('dataAnalys');
        paneleve.conclusionClarity=formData.get('conclusionClarity');
        paneleve.relevent=formData.get('relevent');
        paneleve.clearWritten=formData.get('clearWritten');
        paneleve.logic=formData.get('logic');
        paneleve.Total=formData.get('Total');
        paneleve.Comment=formData.get('Comment');
      
            
 
         console.log(paneleve);
      

         console.log(id)
         await axios.put(`https://af-backend123.herokuapp.com/supEve/update/${id?.id}`,paneleve)
         .then(res=>{
             console.log("return data",res);
            alert("Update Successfull!!");
         })
         .catch(err=>{
             alert("update failed")
             console.log(err);
         });

        }
        

         useEffect(function effectFunction() {
             console.log("get ID",id);
            axios.get(`https://af-backend123.herokuapp.com/supEve/getOneDetail/${id?.id}`)
            .then(res=>{
              console.log("data",res);
              setGroupname(res.data.getOneDetail.Groupname);
              settitle(res.data.getOneDetail.title);
              setabstract(res.data.getOneDetail.abstract);
              setproblemIdentified(res.data.getOneDetail.problemIdentified);
              setclearyStated(res.data.getOneDetail.clearyStated);
              setreferences(res.data.getOneDetail.references);
              setmodelframework(res.data.getOneDetail.modelframework);
              setMethoDescription(res.data.getOneDetail.MethoDescription);
              setappro(res.data.getOneDetail.appro);
              setdataCollect(res.data.getOneDetail.dataCollect);
              setdataAnalys(res.data.getOneDetail.dataAnalys);
              setconclusionClarity(res.data.getOneDetail.conclusionClarity);
              setrelevent(res.data.getOneDetail.relevent);
              setclearWritten(res.data.getOneDetail.clearWritten);
              setlogic(res.data.getOneDetail.logic);
              setTotal(res.data.getOneDetail.Total);
              setComment(res.data.getOneDetail.Comment);
               
                
            
         })
            .catch(err => console.log(err));

           


          
          // eslint-disable-next-line react-hooks/exhaustive-deps
          },[]);

    return (
        <div style={{ backgroundColor:"#FFE9EE"}} >
        

        <div className="col-md-8 mt-4 mx-auto" >
        <div style={{height:'80px', width:'100%', marginTop:'-20px'}}>
        <h1 ><center>Update Document Evaluation</center>  </h1>
        </div>
        <br></br>

                       

        
        <form className="row g-3" style={{backgroundColor:"#ebecf0"}}>
        
                <div className="form-group">
                <label className="form-label">Group Name : </label>
                     <input type="text"
                     className="form-control"
                     name="Groupname"
                     onChange={e => setGroupname(e.target.value)}
                     value={Groupname}
                    
                     />
                 </div>

                 <div className="form-group">
                   
                 <label className="form-label">Research Topic : </label>
                     <input type="text"
                     className="form-control"
                     name="Topic"
                     onChange={e => settitle(e.target.value)}
                     value={title}  
                     
                   />
                   <hr></hr>
                 </div>

                 <div className="form-group">
                 <h4>Research Hypothesis (15 Marks)</h4>
                 <label className="form-label">Abstract : (5 marks)</label>
                     <input type="text"
                     className="form-control"
                     name="abstract"
                     onChange={e => setabstract(e.target.value)}
                     value={abstract}  
                     
                   
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Problem Identified Clearly : (5 marks) </label>
                     <input type="text"
                     className="form-control"
                     name="problemIdentified"
                     onChange={e => setproblemIdentified(e.target.value)}
                     value={problemIdentified}  
                     
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Research Area Clearly Stated : (5 marks) </label>
                     <input type="text"
                     className="form-control"
                     name="clearyStated"
                     onChange={e => setclearyStated(e.target.value)}
                     value={clearyStated}  
                     />
                 </div>

                 <div className="form-group">
                 <h4>Literature Review (15 Marks)</h4>
                 <label className="form-label">References</label>
                     <input type="text"
                     className="form-control"
                     name="references"
                     onChange={e => setreferences(e.target.value)}
                     value={references}  
                    />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Model Framwork : (10 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="modelframework"
                      onChange={e => setmodelframework(e.target.value)}
                      value={modelframework} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <h4>Methodology (15 Marks)</h4>
                 <label className="form-label">Description : (5 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="MethoDescription"
                      onChange={e => setMethoDescription(e.target.value)}
                      value={MethoDescription} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Appropriation : (5 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="appro"
                      onChange={e => setappro(e.target.value)}
                      value={appro} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Data Collection Methods : (5 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="dataCollect"
                      onChange={e => setdataCollect(e.target.value)}
                      value={dataCollect} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <h4>Data Analysis (15 Marks)</h4>
                 <label className="form-label">Data Analsing Methods : (15 marks) </label>
                     <input type="text"
                     className="form-control"
                        name="dataAnalys"
                      onChange={e => setdataAnalys(e.target.value)}
                      value={dataAnalys} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <h4>Conclusion </h4>
                 <label className="form-label">Clearity of Conclusion : (10 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="conclusionClarity"
                      onChange={e => setconclusionClarity(e.target.value)}
                      value={conclusionClarity} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Relevent : (10 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="relevent"
                      onChange={e => setrelevent(e.target.value)}
                      value={relevent} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <h4>Report Writing (20 Marks)</h4>  
                 <label className="form-label">Clearly Written : (10 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="clearWritten"
                      onChange={e => setclearWritten(e.target.value)}
                      value={clearWritten} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Logical Organized : (10 marks) </label>
                     <input type="text"
                     className="form-control"
                        name="logic"
                      onChange={e => setlogic(e.target.value)}
                      value={logic} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Total Mark : (100 marks)</label>
                     <input type="text"
                     className="form-control"
                        name="Total"
                      onChange={e => setTotal(e.target.value)}
                      value={Total} 
                     
                     />
                 </div>

                 <div className="form-group">
                 <label className="form-label">Feedback : </label>
                     <textarea type="text"
                     className="form-control"
                        name="Comment"
                      onChange={e => setComment(e.target.value)}
                      value={Comment} 
                     
                     />
                 </div>

                 </form>
                 <button className="btn btn-success" type="submit" style={{marginTop:'15px', width:"250px", marginLeft:"370px",backgroundColor:"#0147ab"}} onClick={(e)=>changeOnClick(e)} >
                            <i className="far fa-check-square"></i>
                            &nbsp; Save

                        </button>
                        <button className="btn btn-success" 
                        style={{marginLeft:'890px',padding:'8px 8px',backgroundColor:'#3895d3', marginBottom:"10px"}}>
                        <a href="/SupEvalution" style={{textDecoration:'none',backgroundColor:'#3895d3',color:'white',fontSize:'16px'}}> 
                        <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Go Back</a>
                        </button>

                       
        </div>
        </div>

    );
  }
