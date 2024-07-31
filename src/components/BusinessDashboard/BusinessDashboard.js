// BusinessPOV of Business dashboard SET AVAILABILITY HERE ADALYS

import React, { useState, useEffect } from 'react';
import { Container, FormWrap, Icon, DashboardContent, Section, Title, Text, Calendar, Reviews, ProfitCounter, CalendarHeader, CalendarBody, DayNames, DayBox, DayName, CalendarGrid, ReviewItem, ReviewText, ReviewAuthor, TimeSlotsModal, TimeSlotItem, CloseButton, ServicesSelect, ServiceOption, ThankYouNote, AvailabilityForm, SubmitButton } from './BusinessDashboardElements';
import axios from 'axios';

const BusinessDashboard = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [showThankYou, setShowThankYou] = useState(false);

    const [ business, setBusiness ] = useState(null); // will become business "object"
    const [ error, setError ] = useState(null);

    // This function fetches the business data based on the locally saved userID
    useEffect(() => {
        const fetchBusinessDetails = async () => {
            const userId = localStorage.getItem('userId'); //This gets the user ID from local storage (saved at signin)
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8000/businesses/${userId}`);
                    setBusiness(response.data); //Captures the data from the given user id
                } catch (error) {
                    console.error('Error fetching business details:', error);
                }
            }
        };

        fetchBusinessDetails();
    }, []);

    // Generated array for days in the month
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

    // goal: update timeSlots with actual 

    const timeSlots = [
        "9:00-10:00 AM",
        "10:00-11:00 AM",
        "11:00-12:00 PM",
        "12:00-1:00 PM",
        "1:00-2:00 PM",
        "2:00-3:00 PM",
        "3:00-4:00 PM",
        "4:00-5:00 PM"
    ];

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setShowThankYou(false);
    };

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(prevSlots => {
            if (prevSlots.includes(slot)) {
                return prevSlots.filter(s => s !== slot);
            } else {
                return [...prevSlots, slot];
            }
        });
    };

    const handleAvailabilitySet = async (e) => {

        const newAvailability = {
            day: selectedDay,
            times: selectedTimeSlot
        };

        try {
            const res = await axios.patch(`http://localhost:8000/businesses/${businessID}/availability`, { availability: newAvailability });

            setBusiness(res.data);

        } catch (err) {
            setError(err.message);
        }
    };


    //INSERT HANDLE EDIT DESCRIPTION FUNCTION HERE

    //INSERT HANDLE SEE BOOKINGS FUNCTION HERE

    if (!business) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container style={{ height: '100vh', overflowY: 'auto' }}>
            <Icon to="/">THE FEED</Icon>
            <FormWrap>
                <DashboardContent>
                    <Section>
                        <Title>{business.name}</Title>
                        <ProfitCounter>Profit: ${business.profit}</ProfitCounter>
                        <Text>Business Rating: {business.rating}</Text>
                        <Text>Description: {business.description}</Text>
                        <CloseButton>Edit Description</CloseButton>
                    </Section>
                    <Section>
                        <Title>Calendar</Title>
                        <Calendar>
                            <CalendarHeader>
                                <Text>July 2024</Text>
                            </CalendarHeader>
                            <CalendarBody>
                                <DayNames>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <DayName key={day}>{day}</DayName>
                                    ))}
                                </DayNames>
                                <CalendarGrid>
                                    {daysInMonth.map(day => (
                                        <DayBox key={day} onClick={() => handleDayClick(day)}>{day}</DayBox>

                                    ))}
                                </CalendarGrid>
                            </CalendarBody>
                        </Calendar>
                        {selectedDay !== null && (
                            <AvailabilityForm onSubmit={handleAvailabilitySet}>
                                <Title>Set Availability for July {selectedDay}, 2024</Title>
                                {timeSlots.map((slot, index) => (
                                    <TimeSlotItem
                                        key={index}
                                        onClick={() => handleTimeSlotClick(slot)}
                                        selected={selectedTimeSlot.includes(slot)}
                                    >
                                        {slot}
                                    </TimeSlotItem>
                                ))}
                                <SubmitButton type="submit">Set Availability</SubmitButton>
                                {error && <Text>Error: {error}</Text>}
                            </AvailabilityForm>
                        )}
                        <CloseButton>See Bookings</CloseButton>
                    </Section>
                    <Section>
                        <Title>Reviews</Title>
                        <Reviews>
                            <ReviewItem>
                                <ReviewText>"Woah! My toilet has never looked better!"</ReviewText>
                                <ReviewAuthor>- Izzy Jones</ReviewAuthor>
                            </ReviewItem>
                            <ReviewItem>
                                <ReviewText>"Highly recommend Joe Toilet for any toilet related needs."</ReviewText>
                                <ReviewAuthor>- Cody Caraballo</ReviewAuthor>
                            </ReviewItem>
                            <ReviewItem>
                                <ReviewText>"Great for toilets, he even did my sink!"</ReviewText>
                                <ReviewAuthor>- Adalys M Garcia</ReviewAuthor>
                            </ReviewItem>
                        </Reviews>
                    </Section>
                </DashboardContent>
            </FormWrap>
        </Container>
    );
};

export default BusinessDashboard;
