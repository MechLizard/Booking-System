
import { use, expect } from 'chai';
import supertest from 'supertest';
import chaiHttp from 'chai-http';
import request from "request";
import { startApp } from './startServer.mjs';
let backendServer, frontendApp;
import { describe, it, before, after } from 'mocha';
//import { app } from "../MERN/backend_server/server.js";
import app from '../MERN/backend_server/server.js';
import User from '../MERN/backend_server/models/User.js';
import Booking from '../MERN/backend_server/models/Booking.js';
import Business from '../MERN/backend_server/models/Business.js';
import bcrypt from 'bcryptjs';

//import { App } from "../src/App.js";

//const { expect } = chai;
//chai.use(chaiHttp);
const chai = use(chaiHttp)

async function fetchPage(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                reject({error});
            } else {
                resolve({
                    statusCode: response.statusCode,
                    body: body,
                });
            }
        })
    })
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


before(async function () {
    this.timeout(30000); // Increase timeout to give servers time to start
    const servers = await startApp();
    if (servers) {
        //backendServer = servers.backendServer;
        frontendApp = servers.frontendApp;
        console.log('Started servers')
    } else {
        console.log('Failed to start servers')
    }
})

after(function() {

    if (backendServer) backendServer.kill();
    if (frontendApp) frontendApp.kill();
})

describe('Availability test', function (){
    let OKStatus = 200;
    it('Check if website is running', async function () {
        const result = await fetchPage('http://localhost:3000')
        expect(OKStatus).to.be.equal(result.statusCode);
    })
})


describe('Test Routes',  () => {
    it('User creation', async() => {
        const response = await supertest(app)
            .post('/users/register')
            .send({ name: 'testuser', phone: '5555555555', zipcode: '55555', email: 'test@test.com',
                password: 'password1', permissions: 'customer' });
        expect(response.statusCode).to.equal(201)
        expect(response.text).to.equal('User registered');
    })

    it('Getting user info', async() => {
        const user = await User.findOne({email: 'test@test.com'})
        expect(user).to.not.equal(undefined);
        const userID = user._id;
        const response = await supertest(app)
            .get(`/users/${userID}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('testuser');
        expect(response.body.phone).to.equal('5555555555');
        expect(response.body.email).to.equal('test@test.com');
        expect(true).to.equal(await bcrypt.compare('password1', response.body.password));
        expect(response.body.permissions).to.equal('customer');
    });

    it('Check good user login', async() => {
        const response = await supertest(app)
            .post(`/users/login`)
            .send({ email: 'test@test.com', password: 'password1'});
        expect(response.status).to.equal(200);
    });

    it('Check bad user login', async() => {
        const response = await supertest(app)
            .post(`/users/login`)
            .send({ email: 'test@test.com', password: 'wrongpassword'});
        expect(response.status).to.equal(400);
    });

    it('Business creation', async() => {
        const response = await supertest(app)
            .post('/businesses/register')
            .send({ name: 'testbusiness', serviceType: 'plumber', phone: '5555555555', zipcode: '55555',
                email: 'btest@test.com', password: 'password1', permissions: 'business' });
        expect(response.statusCode).to.equal(201)
        expect(response.text).to.equal('Business registered');
    })

    it('Getting business info', async() => {
        const business = await Business.findOne({email: 'btest@test.com'})
        expect(business).to.not.equal(undefined);
        const businessID = business._id;
        const response = await supertest(app)
            .get(`/businesses/${businessID}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('testbusiness');
        expect(response.body.serviceType).to.equal('plumber')
        expect(response.body.phone).to.equal('5555555555');
        expect(response.body.email).to.equal('btest@test.com');
        expect(true).to.equal(await bcrypt.compare('password1', response.body.password));
        expect(response.body.permissions).to.equal('business');
    });

    it('Check good business login', async() => {
        const response = await supertest(app)
            .post(`/businesses/login`)
            .send({ email: 'btest@test.com', password: 'password1'});
        expect(response.status).to.equal(200);
    });

    it('Check bad business login', async() => {
        const response = await supertest(app)
            .post(`/businesses/login`)
            .send({ email: 'btest@test.com', password: 'badpassword'});
        expect(response.status).to.equal(400);
    });

    it('Set availability', async function() {
        const business = await Business.findOne({email: 'btest@test.com'})
        expect(business).to.not.equal(undefined);
        const businessID = business._id;

        const testTimeSlots = [
            "10:00-11:00 AM",
            "11:00-12:00 PM"
        ];

        const testAvailability = {
            day: 15,
            times: testTimeSlots
        };

        const mainObject = {
            availability: testAvailability
        };

        const response = await supertest(app)
            .patch(`/businesses/${businessID}/availability`)
            .send(mainObject);
        expect(response.status).to.equal(200);
    });
})