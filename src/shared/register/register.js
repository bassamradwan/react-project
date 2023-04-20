import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './register.css'

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const validateName = (name) => {
        const re = /\s/;
        return re.test(name);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return re.test(password);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateName(name)) {
            setNameError(true);
        } else {
            setNameError(false);
        }

        if (!validatePassword(password)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }


        
        if (!passwordError && !confirmPasswordError && !nameError) {
            console.log('Form submitted:', name, email, password);
        }
    };


    return (
        <div className='reg-div'>
        <Form className='reg-form' onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                {nameError && (
                    <Alert variant="danger">
                        Name must not contain any spaces.
                    </Alert>)}
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                {passwordError && (
                    <Alert variant="danger">
                        Password must be at least 8 characters long and contain at least one uppercase letter,
                        one lowercase letter, one number, and one special character.
                    </Alert>
                )}
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Confirm password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
                
                {confirmPasswordError && (
                    <Alert variant="danger">Passwords do not match.</Alert>
                )}
                
            </Form.Group><br/>
            
            <Button className='myButton' type="submit">
                Submit
            </Button>
        </Form>
        </div>
    );
};

export default RegisterForm;
