import axios from "axios";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name,setName] = useState("");
    const [file,setFile] = useState("");

    const navigate = useNavigate();

    const addUserData = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo",file);
        formData.append("name",name);

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

        console.log("hii");

        const res = await axios.post("https://testing-pi-five-21.vercel.app/register",formData,config);
        
        console.log("hii22");

        if(res.status === 200){
            navigate("/")
        }else{
            alert("error")
        }
    }

    return (
        <>
            <div className='container mt-3'>
                <h1>Upload your Img Here</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="file" onChange={(e)=>setFile(e.target.files[0])} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={addUserData}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Register