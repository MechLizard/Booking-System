import React, { useState } from 'react';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, TextLink } from './SigninElements';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the POST request to your backend for authentication
            const response = await axios.post('http://localhost:5000/users/login', formData);

            // Save the token and permissions to local storage or state
            localStorage.setItem('authToken', response.data.token);
            const permissions = response.data.role;

            // Redirect based on the user's permissions
            if (permissions === 'customer') {
                navigate('/customer-dashboard');
            } else if (permissions === 'business') {
                navigate('/business-dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('There was an error with the login process:', error);
            // Handle errors, e.g., show an error message
        }
    };

    return (
        <Container>
            <FormWrap>
                <Icon to="/">THE FEED</Icon>
                <FormContent>
                    <Form onSubmit={handleSubmit}>
                        <FormH1>Sign in to your account</FormH1>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <FormInput
                            type='email'
                            id='email'
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormInput
                            type='password'
                            id='password'
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FormButton type='submit'>Continue</FormButton>
                        <TextLink to="/register/customer">CREATE AN ACCOUNT</TextLink>
                        <TextLink to="/register/business">REGISTER YOUR BUSINESS</TextLink>
                        <TextLink to="/business-dashboard">BUSINESS POV</TextLink>
                        <TextLink to="/customer-dashboard">CUSTOMER POV</TextLink>
                        <TextLink to="/testing">TESTING</TextLink>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    );
};

export default SignIn;
