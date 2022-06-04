import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav1 from "../AdminNavbar";

export default function UploadDocument() {
  const [assignmentname, setAName] = useState("");
  const [document, setDocument] = useState("");

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

  const handleFileUpload = (event) => {
    event.persist();

    let files = event.target.files;
    setDocument(files[0]);
  };

  async function sendData(e) {
    e.preventDefault();

    if (document) {
      var data = new FormData();
      data.append("attachment", document);

      await axios
        .post("https://af-backend123.herokuapp.com/api/files/uploadFile", data)
        .then(async (res) => {
          if (res.status == 200) {
            console.log(res);
            fileUrl = res.data.path.replace(/\\/g, "/");

            const newDocument = {
              assignmentname: assignmentname,
              document: fileUrl,
            };

            await uploadSchemeData(newDocument);
          } else {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const newDocument = {
        assignmentname: assignmentname,
        document: "",
      };

      await uploadSchemeData(newDocument);
    }
  }

  async function uploadSchemeData(newDocument) {
    console.log(newDocument);
    await axios
      .post("https://af-backend123.herokuapp.com/document/uploadDocument", newDocument)
      .then((willcreate) => {
        console.log(willcreate);
        if (willcreate) {
          swal({
            title: "Success",
            text: "Document uploaded Successfully",
            icon: "success",
            type: "success",
          }).then(function () {
            window.location.href = "/uploadDocument";
          });
        } else {
          swal("Document Upload Failed!");
        }
      });
  }

  return (
    <>
    <Nav1 />
    <div className="container">
      <form onSubmit={sendData}>
        <br />
        <center>
          <h1>Upload Document/Presentation Templates</h1>
        </center>
        <br />
        <div class="form-group">
          <label for="assignmentname">Assignment Name</label>
          <input
            type="text"
            class="form-control"
            id="assignmentname"
            placeholder="Enter Assignment Name"
            onChange={(e) => {
              setAName(e.target.value);
            }}
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="document">Document Description</label>
          <input
            type="file"
            class="form-control"
            id="document"
            placeholder="Select Document"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        <br />

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </>
  );
}
