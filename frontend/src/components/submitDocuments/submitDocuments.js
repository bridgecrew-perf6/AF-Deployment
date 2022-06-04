import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Nav1 from '../StudentNavbar';

export default function SubmitDocument() {
    const { id } = useParams();

    const [docName, setDocName] = useState("");
    const [attachment, setAttachment] = useState("");
    const [research, setResearch] = useState("");

    async function sendData(e) {
        e.preventDefault();

      var data = new FormData();
      data.append("attachment", attachment);

      await axios
        .post("/api/documents/uploadDoc", data)
        .then(async (res) => {
          if (res.status == 200) {
            console.log(res);
            var fileUrl = res.data.path.replace(/\\/g, "/");

            const newDoc = {
                groupName: research.groupId,
                researchName: research.topic,
                documentName: docName,
                attachment: fileUrl
            };

            await uploadSchemeData(newDoc);
          } else {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }

  async function uploadSchemeData(newDoc) {
    console.log(newDoc);
    await axios
      .post("/api/documents/saveDoc", newDoc)
      .then((willcreate) => {
        console.log(willcreate);
        if (willcreate) {
          swal({
            title: "Success",
            text: "Document Uploaded Successfully",
            icon: "success",
            type: "success",
          }).then(function () {
            window.location.href = "/studentMain";
          });
        } else {
          swal("Document Upload Failed!");
        }
      });
    }


    const handleFileUpload = (event) => {
        event.persist();
    
        let files = event.target.files;
        setAttachment(files[0]);
      };

      function getResearch() {
        axios.get(`/api/student/getResearchById/${id}`).then((res) => {
            setResearch(res.data);
        })
    }

    useEffect(() => {
        getResearch();
    }, [])

    // console.log(research)       ////

  return (
    <>
    <Nav1 />
      <div>
        <div className="container">
          <form onSubmit={sendData}>
            <br />
            <center>
              <h1>Document Submission</h1>
            </center>
            <br />
            <br />
            <div class="form-group">
              <label for="docName">Document Name</label>
              <input
                type="text"
                class="form-control"
                id="docName"
                placeholder="Enter Document Name"
                onChange={(e) => {
                  setDocName(e.target.value);
                }}
                required
              />
            </div>
            <br />
            <div class="form-group">
              <label for="overallMark">Document</label>
              <input
                type="file"
                class="form-control"
                id="attachment"
                placeholder="Select Attachment"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
            <br />

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
