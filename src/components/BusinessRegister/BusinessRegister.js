import React, { useState } from 'react';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, Text, TextLink } from './BusinessRegisterElements';
import axios from 'axios';

const BusinessRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        zipcode: '',
        email: '',
        password: '',
        confirmPassword: '',
        permissions: 'business',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/register', formData);
            console.log(response.data);
            window.location.href = '/';
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <Container>
            <FormWrap>
                <Icon to="/">THE FEED</Icon>
                <FormContent>
                    <Form onSubmit={handleSubmit}>
                        <FormH1>Create Your Business Account</FormH1>
                        {/* Customer Info */}

                        <FormLabel htmlFor='name'>Business Name</FormLabel>
                        <FormInput type='text' id='name' required value={formData.name} onChange={handleChange} />
                        <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                        <FormInput type='tel' id='phone' required value={formData.phone} onChange={handleChange} />
                        <FormLabel htmlFor='zipcode'>Zipcode</FormLabel>
                        <FormInput type='text' id='zipcode' required value={formData.zipcode} onChange={handleChange} />

                        {/* Account Creation */}

                        <FormLabel htmlFor='email'>Email (Username)</FormLabel>
                        <FormInput type='email' id='email' required value={formData.email} onChange={handleChange} />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormInput type='password' id='password' required value={formData.password} onChange={handleChange} />
                        <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
                        <FormInput type='password' id='confirmPassword' required value={formData.confirmPassword} onChange={handleChange} />

                        <FormButton type='submit'>Register</FormButton>
                        <Text>Already have an account? <TextLink to="/">Sign In</TextLink></Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    );
};

export default BusinessRegister;
