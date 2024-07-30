import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './components/Signin';
import CustomerRegister from './components/CustomerRegister/CustomerRegister';
import BusinessRegister from './components/BusinessRegister/BusinessRegister';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import Testing from './components/TESTING/testroute';
import ViewBusiness from './components/ViewBusiness/ViewBusiness';

function App() {
    return (
            <div className="container" style={{ height: '100vh', width: '100vw' }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<SignIn/>} exact />
                        <Route path="/register/customer" element={<CustomerRegister />} />
                        <Route path="/register/business" element={<BusinessRegister />} />
                        <Route path="/business-dashboard" element={<BusinessDashboard />} />
                        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                        <Route path="/testing" element={<Testing />} />
                        <Route path="/view-business" element={<ViewBusiness/>} />
                    </Routes>
                </Router>
            </div>
    );
}

export default App;

