import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Container, FormWrap, PageTitle, FormContent, Dropdown, Tile,
    TileContent, TileHeader, Icon } from './CustomerDashboardElements.js';

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
    }, []);

    // for service select dropdown
    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    // handle tile click
    const handleTileClick = (id) => {
        navigate(`/view-business/${id}`);
    };

    // Search by service type
    const filteredTiles = selectedService
        ? businesses.filter(business => business.serviceType === selectedService)
        : businesses;

    return (
        <Container style={{ height: '100vh', overflowY: 'auto' }}>
            <Icon to="/">THE FEED</Icon>
            <FormWrap>
                <PageTitle>Find a Business You'll Love!</PageTitle>
                <FormContent>
                    {/* Dropdown for selecting business type */}
                    <Dropdown onChange={handleServiceChange}>
                        <option value="">Select Business Type</option>
                        <option value="Service">Service</option>
                        <option value="Retail">Retail</option>
                        <option value="Restaurant">Restaurant</option>
                    </Dropdown>

                    {/* Display tiles */}
                    {filteredTiles.map((business, index) => (
                        <Tile key={index} onClick={() => handleTileClick(business._id)}>
                            <TileContent>
                                <TileHeader>{business.name}</TileHeader>
                                <p>{business.rating} ★</p>
                                <p>{business.serviceType}</p>
                            </TileContent>
                        </Tile>
                    ))}
                </FormContent>
            </FormWrap>
        </Container>
    );
};

export default CustomerDashboard;
