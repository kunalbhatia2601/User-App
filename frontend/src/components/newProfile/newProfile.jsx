import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from "axios";

const backURL = require("../backend_configs/back_url");
const backend_URL = backURL.myBackurl;


function NewProfile()
{


    var [userData, setUserData] = useState({
        Name:"",
        Email:"",
        DOB:"",
        ProfilePic:null,
    })

    var [profilePrev, setprofilePrev] = useState("https://www.pngkey.com/png/detail/157-1579943_no-profile-picture-round.png");


    function doUpdate(event)
    {

        console.log(event);

        var {name, value} = event.target;
        setUserData({...userData, [name]:value});

    }

    function doUpdatePic(event)
    {
        var profilePicPre = document.querySelector("#profilePicPre");

        if (event.target.files.length > 0)
        {
            profilePicPre.src = URL.createObjectURL(event.target.files[0]);
            setUserData({...userData, ["ProfilePic"]: event.target.files[0]});
        }

    }

    async function submitDetails()
    {

        // var url = "http://localhost:2005/user/new";

        var url = backend_URL + "user/new";

        var formdata = new FormData();

        for(var obj in userData)
        {
            formdata.append(obj, userData[obj]);
        }

        var serverMsg = await axios.post(url, formdata, {headers:{'Content-Type':'multipart/form-data'}});

        if(serverMsg.data.status)
        {
            alert("Data Saved");
        }
        else
        {
            alert(serverMsg.data.msg);
        }

    }

    async function searchDetails()
    {
        
        var url = backend_URL + "user/search";

        var serverMsg = await axios.post(url, userData);

        
        if(serverMsg.data !== "No Data Found")
        {
            var data = serverMsg.data;

            setUserData(data)

            if(data.ProfilePic !== "noPic.jpg")
                setprofilePrev(backend_URL + "uploads/" + data.ProfilePic);
            else
                setprofilePrev("https://www.pngkey.com/png/detail/157-1579943_no-profile-picture-round.png");

        }
        else
            alert("No Data Found !");

    }

    async function updateDetails()
    {

        var url = backend_URL + "user/update";

        var formdata = new FormData();

        for(var obj in userData)
        {
            formdata.append(obj, userData[obj]);
        }


        var serverMsg = await axios.post(url, formdata, {headers:{'Content-Type':'multipart/form-data'}});

        if(serverMsg.data.status)
        {
            alert("Data Updated");
        }
        else
        {
            alert(serverMsg.data.msg);
        }

    }


    return (

        <div>

            <div className="text-center mb-5 mt-2">

                <img style={{width:'200px', height:"200px", borderRadius:'50%'}} id='profilePicPre' src={profilePrev} alt="Select Profile" />

            </div>

            <Form>
                
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={userData.Name} name='Name' type="text" onChange={doUpdate} placeholder="Enter Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='Email' value={userData.Email} type="email" onChange={doUpdate} placeholder="Enter Email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control name='DOB' value={userData.DOB} type="date" onChange={doUpdate} required />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formGroupProfile">
                    <Form.Label>Profile Pic</Form.Label>
                    <Form.Control name='ProfilePic' onChange={doUpdatePic} type="file" required />
                </Form.Group>

                <div className="row justify-content-around mt-3">
                    <input type="button" onClick={submitDetails} className='btn btn-primary col-5' value="Submit Details" />
                    <input type="button" onClick={searchDetails} className='btn btn-primary col-5' value="Search Details" />
                    <input type="button" onClick={updateDetails} className='btn btn-primary col-11 mt-4' value="Update Details" />
                </div>
                

            </Form>


        </div>

    )

}

export default NewProfile