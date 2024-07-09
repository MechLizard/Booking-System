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

// Wrapper for the form section
export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
`;

// Container for the dashboard content
export const DashboardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Styles for each section of the dashboard
export const Section = styled.div`
    width: 80%;
    max-width: 800px;
    margin-bottom: 20px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Section titles.
export const Title = styled.h2`
    margin-bottom: 10px;
    color:darkslategrey;
    font-size: 24px;
`;

// Text within sections
export const Text = styled.p`
    font-size: 16px;
    color: black;
`;

//Styling for the profit counter
export const ProfitCounter = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: black;
`;

// Placeholder calendar
export const Calendar = styled.div`
    height: 300px;
    background: #eaeaea;
    border-radius: 8px;
`;

//Placeholder reviews section
export const Reviews = styled.div`
    background: #eaeaea;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`
