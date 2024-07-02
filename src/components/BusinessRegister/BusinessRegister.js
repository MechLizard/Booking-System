import React from 'react';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon, Text, TextLink } from './BusinessRegisterElements';

const CustomerRegister = () => {
    return (
        <Container>
            <FormWrap>
                <Icon to="/">THE FEED</Icon>
                <FormContent>
                    <Form action="#">
                        <FormH1>Create Your Business Account</FormH1>
                        {/* Customer Info */}

                        <FormLabel htmlFor='name'>Business Name</FormLabel>
                        <FormInput type='text' id='first-name' required />
                        <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                        <FormInput type='tel' id='phone' required />
                        <FormLabel htmlFor='zipcode'>Zipcode</FormLabel>
                        <FormInput type='text' id='zipcode' required />

                        {/* Account Creation */}

                        <FormLabel htmlFor='email'>Email (Username)</FormLabel>
                        <FormInput type='email' id='email' required />
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormInput type='password' id='password' required />
                        <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
                        <FormInput type='password' id='confirm-password' required />


                        <FormButton type='submit'>Register</FormButton>
                        <Text>Already have an account? <TextLink to="/">Sign In</TextLink></Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    );
}

export default CustomerRegister;

