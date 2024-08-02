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
    color: darkslategrey;
    font-size: 24px;
`;

// Text within sections
export const Text = styled.p`
    font-size: 16px;
    color: black;
`;

// profit counter
export const ProfitCounter = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: black;
`;

// Calendar section
export const Calendar = styled.div`
    display: flex;
    flex-direction: column;
    background: #eaeaea;
    border-radius: 8px;
    padding: 20px;
`;

// Calendar header
export const CalendarHeader = styled.div`
    text-align: center;
    margin-bottom: 10px;
`;

// Calendar body
export const CalendarBody = styled.div`
    display: flex;
    flex-direction: column;
`;

// Day names
export const DayNames = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
`;

// Individual day name
export const DayName = styled.div`
    flex: 1;
    text-align: center;
    font-weight: bold;
`;

// Calendar grid
export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
`;

// Individual day box
export const DayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: lightgrey;
    }
`;

// Placeholder reviews section
export const Reviews = styled.div`
    background: #eaeaea;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Individual review item
export const ReviewItem = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Review text
export const ReviewText = styled.p`
    font-size: 14px;
    color: darkslategrey;
`;

// Review author
export const ReviewAuthor = styled.p`
    font-size: 12px;
    color: grey;
    text-align: right;
`

// Time slots modal
export const TimeSlotsModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    z-index: 1000;
`

// Time slot item
export const TimeSlotItem = styled.div`
    background: #eaeaea;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover {
        background: lightgrey;
    }
`

// Close button
export const CloseButton = styled.button`
    background: darkslategrey;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    float: right;
`

// Services select
export const ServicesSelect = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
`

// Service option
export const ServiceOption = styled.option`
    padding: 10px;
`
// Thank you note styling
export const ThankYouNote = styled.div`
    margin-top: 20px;
    padding: 10px;
    background: #d7eed7;
    border-radius: 4px;
    color: #486856;
    text-align: center;
`;

export const AvailabilityForm = styled.form`
    display: flex;
    flex-direction: column;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
`;

// Submit button
export const SubmitButton = styled.button`
    background: darkslategrey;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background: grey;
    }
`;

// Container for bookings modal
export const BookingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px; 
`;

// Container for each booking object
export const BookingItem = styled.div`
    border: 1px solid #ddd; 
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Modal container for adding a new service
export const AddServiceModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Button to open the "Add Service" modal
export const AddServiceButton = styled.button`
    background: darkslategrey; 
    color: #fff; 
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 0;

    &:hover {
        background: slategray; 
    }
`;

// Form container inside the modal
export const AddServiceForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

// Input field for form
export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
`;

// Label for form inputs
export const Label = styled.label`
    font-size: 16px;
    color: #495057;
`;

// Group for form elements
export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
`;

