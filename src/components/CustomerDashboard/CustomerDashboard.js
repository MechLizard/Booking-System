import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, FormWrap, PageTitle, FormContent, Dropdown, Tile, TileContent, TileHeader, Icon } from './CustomerDashboardElements';

const CustomerDashboard = () => {
    const [selectedService, setSelectedService] = useState('');
    const [businesses, setBusinesses] = useState([]);

    // get business data from API
    useEffect(() => {
        const getBusinesses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/businesses');
                setBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };

        getBusinesses();
    }, []);

    //for service select dropdown
    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    //Search by service type
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
                        <Tile key={index}>
                            <TileContent>
                                <TileHeader>{business.name}</TileHeader>
                                <p>{business.rating} ★</p>
                                <p>{business.serviceType}</p> {/* SOMETHING IS WRONG WITH REGISTER, SERVICE TYPE DOES NOT APPEAR IN MONGO */}
                            </TileContent>
                        </Tile>
                    ))}
                </FormContent>
            </FormWrap>
        </Container>
    );
};

export default CustomerDashboard;
