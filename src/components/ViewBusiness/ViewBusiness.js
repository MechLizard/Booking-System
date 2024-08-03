// Customer POV of Business Dashboard (currently setup for Customer)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, FormWrap, Icon, DashboardContent, Section, Title, Text, Calendar, Reviews, ProfitCounter, CalendarHeader, CalendarBody, DayNames, DayBox, DayName, CalendarGrid, ReviewItem, ReviewText, ReviewAuthor, TimeSlotsModal, TimeSlotItem, CloseButton, ServicesSelect, ServiceOption, ThankYouNote } from './ViewBusinessElements';

const ViewBusiness = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [showThankYou, setShowThankYou] = useState(false);

    //For business display
    const { id } = useParams(); // Get the business ID from the URL
    const [business, setBusiness] = useState(null);

    // get business' data
    useEffect(() => {
        const getBusiness = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/businesses/${id}`);
                setBusiness(response.data);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        };

        getBusiness();
    }, [id]);

    // Filtered time slots based on business availability
    useEffect(() => {
        if (selectedDay && business?.availability) {
            const availabilityForDay = business.availability.find(avail => avail.day === selectedDay);

            console.log('Availability entry for selected day:', availabilityForDay);

            const availableTimes = availabilityForDay?.times || [];
            setFilteredTimeSlots(availableTimes);

            console.log('Available times:', availableTimes);
        } else {
            setFilteredTimeSlots([]);
        }
    }, [selectedDay, business?.availability]);

    if (!business) {
        return <p>Loading...</p>;
    }

    // Generated array for days in the month
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

    // Event handler for day clicks
    const handleDayClick = (day) => {
        setSelectedDay(day);
        setShowThankYou(false);
        console.log(business.name);
        console.log(business.availability);
    };

    // Event handler for service selection
    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    //Creates and sends new booking object when customer clicks book
    const handleTimeSlotClick = async (slot) => {
        const userId = localStorage.getItem('userId');

        try {
            // Fetches customer details using userId from local storage (saved at signin)
            const customerResponse = await axios.get(`http://localhost:8000/users/${userId}`);
            const customerEmail = customerResponse.data.email;

            // Booking object
            const newBooking = {
                customerEmail: customerEmail,
                service: selectedService,
                day: selectedDay,
                Time: slot,
            };

            // Add booking to business' bookings array
            const response = await axios.patch(`http://localhost:8000/businesses/${id}/booking`, { booking: newBooking });
            setBusiness(response.data);
            setShowThankYou(true);
        } catch (error) {
            console.error('Error booking service:', error);
        }
    };

    // Reset timeslot modal
    const closeTimeSlotsModal = () => {
        setSelectedDay(null);
        setSelectedService("");
        setSelectedTimeSlot("");
        setShowThankYou(false);
    };

    return (
        <Container style={{ height: '100vh', overflowY: 'auto' }}>
            <Icon to="/customer-dashboard">THE FEED</Icon>
            <FormWrap>
                <DashboardContent>
                    <Section>
                        <Title>{business.name}</Title>
                        <Text>Business Rating: ...★</Text>
                        <Text>Description: {business.description}</Text>
                        <Text>Phone: {business.phone}</Text>
                        <Text>Zipcode: {business.zipcode}</Text>
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
            {selectedDay !== null && (
                <TimeSlotsModal>
                    <CloseButton onClick={closeTimeSlotsModal}>Close</CloseButton>
                    <Title>Time Slots for July {selectedDay}, 2024</Title>
                    <ServicesSelect onChange={handleServiceChange} value={selectedService}>
                        <option value="">Select a Service</option>
                        {business.servicesOffered.map((service, index) => (
                            <ServiceOption key={index} value={service.service}>{service.service}</ServiceOption>
                        ))}
                    </ServicesSelect>
                    {filteredTimeSlots.length > 0 ? (
                        filteredTimeSlots.map((slot, index) => (
                            <TimeSlotItem key={index} onClick={() => handleTimeSlotClick(slot)}>{slot}</TimeSlotItem>
                        ))
                    ) : (
                        <Text>No available time slots for this day.</Text>
                    )}
                    {showThankYou && (
                        <ThankYouNote>
                            Thank you for booking {selectedService} for Wednesday July {selectedDay}, 2024 at {selectedTimeSlot.split('-')[0]}.
                        </ThankYouNote>
                    )}
                </TimeSlotsModal>
            )}
        </Container>
    );
};

export default ViewBusiness;
