import React, { useState } from 'react';
import {Container, FormWrap, PageTitle, FormContent, Dropdown, Tile, TileContent, TileHeader, Icon} from './CustomerDashboardElements';

const CustomerDashboard = () => {
    const [selectedService, setSelectedService] = useState('');

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    //Add retrieve calls from mongo here i think

    // fill data for tiles here
    const tilesData = [
        { name: "Joe Toilet", rating: "5 ★", type: "Service" },
        { name: "Adalys' Closet", rating: "4.7 ★", type: "Retail" },
        { name: "Cody's Comics", rating: "4.5 ★", type: "Retail" },
        { name: "Izzy-Freezy Ice Cream", rating: "4.4 ★", type: "Restaurant" },
        { name: "Carmen's Rat Emporium", rating: "1.3 ★", type: "Service" }
    ];

    const filteredTiles = selectedService
        ? tilesData.filter(tile => tile.type === selectedService)
        : tilesData;

    return (
        <Container>
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
                    {filteredTiles.map((tile, index) => (
                        <Tile key={index}>
                            <TileContent>
                                <TileHeader>{tile.name}</TileHeader>
                                <p>{tile.rating}</p>
                                <p>{tile.type}</p>
                            </TileContent>
                        </Tile>
                    ))}
                </FormContent>
            </FormWrap>
        </Container>
    );
}

export default CustomerDashboard;
