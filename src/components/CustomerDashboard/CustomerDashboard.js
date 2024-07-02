import React from 'react';
import { Container, FormWrap, PageTitle, FormContent, Dropdown, Tile, TileContent, TileHeader, Icon } from './CustomerDashboardElements';

const CustomerDashboard = () => {
    return (
        <Container>
            <Icon to="/">THE FEED</Icon>
            <FormWrap>

                <PageTitle>Find a Business You'll Love!</PageTitle>

                <FormContent>

                    <Dropdown>
                        <option value="">Select Business Type</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="Service">Service</option>
                        <option value="Retail">Retail</option>
                    </Dropdown>

                    {/* Tiles */}
                    <Tile>
                    <TileContent>
                            <TileHeader>Joe Toilet</TileHeader>
                            <p>5 ★</p>
                            <p>Service</p>
                        </TileContent>
                    </Tile>

                    <Tile>
                        <TileContent>
                            <TileHeader>Adalys' Closet</TileHeader>
                            <p>4.7 ★</p>
                            <p>Retail</p>
                        </TileContent>
                    </Tile>

                    <Tile>
                        <TileContent>
                            <TileHeader>Cody's Comics</TileHeader>
                            <p>4.5 ★</p>
                            <p>Retail</p>
                        </TileContent>
                    </Tile>

                    <Tile>
                        <TileContent>
                            <TileHeader>Izzy-Freezy Ice Cream</TileHeader>
                            <p>4.4 ★</p>
                            <p>Restaurant</p>
                        </TileContent>
                    </Tile>

                    <Tile>
                        <TileContent>
                            <TileHeader>Carmen's Rat Emporium</TileHeader>
                            <p>1.3 ★</p>
                            <p>Service</p>
                        </TileContent>
                    </Tile>

                </FormContent>
            </FormWrap>
        </Container>
    );
}

export default CustomerDashboard;
