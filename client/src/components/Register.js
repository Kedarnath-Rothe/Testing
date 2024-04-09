import axios from "axios";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [name,setName] = useState("");
    const [file,setFile] = useState("");

    const navigate = useNavigate();

    const addUserData = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("photo", file); // Assuming 'file' is defined elsewhere
        formData.append("name", name); // Assuming 'name' is defined elsewhere
    
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
    
        try {
            console.log("Sending request...");
    
            const response = await axios.post(
                "https://testing-pi-five-21.vercel.app/register",
                formData,
                config
            );
    
            console.log("Request successful:", response);
    
            if (response.status === 200) {
                // Handle successful response
                navigate("/"); // Assuming 'navigate' is defined elsewhere for routing
            } else {
                // Handle unexpected status code
                console.error("Unexpected response status:", response.status);
                alert("Unexpected response. Please try again.");
            }
        } catch (error) {
            // Handle request error
            console.error("Request failed:", error);
            alert("Request failed. Please try again later.");
        }
    };
    

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