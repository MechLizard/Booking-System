import axios from 'axios';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const CustomerDashboard = () => {
    const [selectedService, setSelectedService] = useState('');
    const [businesses, setBusinesses] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // get business data from API
    useEffect(() => {
        const getBusinesses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/businesses');
                setBusinesses(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };

        getBusinesses();
    }, [])};

useEffect(() => {
}, []);
