import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null); // Use null for initial file state
    const navigate = useNavigate();

    const addUserData = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("photo", file);
            formData.append("name", name);

            const requestOptions = {
                method: 'POST',
                body: formData
            };

            console.log("Sending request...");
            const response = await fetch("https://testing-pi-five-21.vercel.app/register", requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("Request successful:", response);

            navigate("/"); // Assuming 'navigate' is defined elsewhere for routing
        } catch (error) {
            console.error("Request failed:", error);
            alert("Request failed. Please try again later.");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update file state with the selected file
    };

    return (
        <div className='container mt-3'>
            <h1>Upload your Img Here</h1>
            <Form onSubmit={addUserData}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFile">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Register;
