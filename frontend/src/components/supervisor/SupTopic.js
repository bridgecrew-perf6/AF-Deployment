import React, { Component } from 'react'
//import axios
import axios from 'axios';

export default class SupTopic extends Component {

    //initialize constructor to pass the props
    constructor(props) {
        super(props);
        this.state = {
            //initializing an array 
            GetAlltopics: []
        };

        this.handleTopicChange = this.handleTopicChange.bind(this)
        this.retrieveTopics = this.retrieveTopics.bind(this)
    }

    //calling the method after componenets render to the page
    componentDidMount() {
        this.retrieveTopics();
    }


    //get request method
    retrieveTopics() {
        axios.get("https://af-backend123.herokuapp.com/SupTopic/GetTopics").then(res => {
            console.log(res.data);

            if (res.data.success) {
                this.setState({
                    GetAlltopics: res.data.existingTopics
                });
                console.log(this.state.GetAlltopics)
            }
        })
    }


    //delete function




    //search data according to name

    filterData(GetAlltopics, searchKey) {
        const result = GetAlltopics.filter((CheckOnePEv) =>
            CheckOnePEv.Groupname.toLowerCase().includes(searchKey) ||
            CheckOnePEv.Groupname.includes(searchKey)


        )

        this.setState({ GetAlltopics: result })

    }

    handleTopicChange = async (id, type) => {

        var bodyData = {
            "status": type
        }

        await axios.put('https://af-backend123.herokuapp.com/SupTopic/updateTopic/' + id, bodyData)
            .then(res => {
                console.log(res)
                this.retrieveTopics()

            })
            .catch(error => {
                console.log(error)
            })

    }

    handleSearchArea = (e) => {

        const searchKey = e.currentTarget.value;

        axios.get("https://af-backend123.herokuapp.com/SupTopic/GetTopics").then(res => {
            if (res.data.success) {

                this.filterData(res.data.existingTopics, searchKey)
            }
        });

    }


    render() {
        return (
            <div >


                <div >
                    <center>
                        <h1 >Research Topics</h1>
                        <br></br><br></br>
                    </center>


                    <div  >

                        <input
                            className="form-control" style={{ marginLeft: '250px', width: '300px', float: 'left' }}
                            type="search"
                            placeholder="Search Group Name"
                            name="searchQuery"
                            onChange={this.handleSearchArea}>
                        </input>

                    </div>
                    <br></br><br></br>





                    <table className='table' style={{ width: '1000px', marginLeft: "250px" }}>
                        <tr style={{ fontSize: "20px" }}>
                            <th scope='col' >No</th>
                            <th scope='col'> Group Name </th>
                            <th scope='col'>Topic</th>
                            <th scope='col'>Supervisor</th>
                            <th scope='col'>Status</th>
                        </tr>
                        <tbody>
                            {this.state.GetAlltopics.map((GetAlltopics, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>

                                    <td>{GetAlltopics.groupId} </td>
                                    <td>{GetAlltopics.topic}</td>
                                    <td>{GetAlltopics.supervisor}</td>
                                    <td>{GetAlltopics.status}</td>
                                    {
                                        (GetAlltopics.status == "pending") &&
                                        <td>
                                            <button className="btn btn-primary" onClick={() => this.handleTopicChange(GetAlltopics._id, "Accept")}> Accept Topic </button>&nbsp;
                                            <button className="btn btn-danger" onClick={() => this.handleTopicChange(GetAlltopics._id, "Reject")}> Reject Topic </button>
                                        </td>

                                    }
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <br></br>

                    <button className="btn btn-success"
                        style={{ marginLeft: '1000px', padding: '8px 8px', backgroundColor: '#3895d3' }}>
                        <a href="/SupHome" style={{ textDecoration: 'none', backgroundColor: '#3895d3', color: 'white', fontSize: '16px' }}>
                            <i class="far fa-arrow-alt-circle-left"></i>&nbsp;Previous</a>
                    </button>




                </div>







            </div>
        )
    }
}