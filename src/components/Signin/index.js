import React from 'react'
import {Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon , TextLink} from './SigninElements'

const SignIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">THE FEED</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel htmlFor='for'>Email</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required />
                            <FormButton type='submit'>Continue</FormButton>
                            <TextLink to="/register/customer">CREATE AN ACCOUNT</TextLink>
                            <TextLink to="/register/business">REGISTER YOUR BUSINESS</TextLink>
                            <TextLink to="/business-dashboard">BUSINESS POV</TextLink>
                            <TextLink to="/customer-dashboard">CUSTOMER POV</TextLink>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn;