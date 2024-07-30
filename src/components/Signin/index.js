import React, { useState } from 'react';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, TextLink, FormSelect } from './SigninElements';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'customer' // default to customer
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleRoleChange = (e) => {
        setFormData({
            ...formData,
            role: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Determine endpoint based on the selected role from drop down
            const endpoint = formData.role === 'business'
                ? 'http://localhost:8000/businesses/login'
                : 'http://localhost:8000/users/login';

            // Make the post request to endpoint
            const response = await axios.post(endpoint, formData);

            // Save the token, user ID, and permissions to local storage
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('role', response.data.role);

            console.log('User ID saved to local storage:', localStorage.getItem('userId'));

            // Redirect based on the user's role
            if (response.data.role === 'customer') {
                navigate('/customer-dashboard');
            } else if (response.data.role === 'business') {
                navigate('/business-dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('There was an error with the login process:', error);
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
                        <FormLabel htmlFor='role'>Select Role</FormLabel>
                        <FormSelect id='role' value={formData.role} onChange={handleRoleChange}>
                            <option value="customer">Customer</option>
                            <option value="business">Business</option>
                        </FormSelect>
                        <FormButton type='submit'>Continue</FormButton>
                        <TextLink to="/register/customer">CREATE AN ACCOUNT</TextLink>
                        <TextLink to="/register/business">REGISTER YOUR BUSINESS</TextLink>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    );
};

export default SignIn;
