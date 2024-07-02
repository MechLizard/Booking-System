import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container for the entire page
export const Container = styled.div`
    min-height: 692px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background: darkslategrey;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Icon component at the top of the page
export const Icon = styled(Link)`
    position: absolute;
    top: 32px;
    left: 32px;
    text-decoration: none;
    color: white;
    font-weight: 800;
    font-size: 48px;
    z-index: 1;

    @media screen and (max-width: 480px) {
        top: 16px;
        left: 16px;
    }
`;

// Wrapper for dashboard content
export const FormWrap = styled.div`
    width: 100%;
    max-width: 800px;  
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding-top: 80px;  
`;

// Page title above the tiles
export const PageTitle = styled.h1`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
    color: white;
    text-align: center;
`;

// Container for dropdown and tiles
export const FormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
    width: 100%;
    max-width: 800px;  
    padding: 0 20px;  
`;

// Dropdown menu for selecting business types
export const Dropdown = styled.select`
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    max-width: 400px;
    background-color: #fff;
`;

// Container for individual business tiles
export const Tile = styled.div`
    background: #f4f4f4;
    padding: 20px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 100%;
    text-align: center;  
`;

// Content inside each tile
export const TileContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
`;

// Header for each tile (business name)
export const TileHeader = styled.h2`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #333;
`
