// Customer POV of Business Dashboard (currently setup for Customer)

import React, { useState } from 'react';
import { Container, FormWrap, Icon, DashboardContent, Section, Title, Text, Calendar, Reviews, ProfitCounter, CalendarHeader, CalendarBody, DayNames, DayBox, DayName, CalendarGrid, ReviewItem, ReviewText, ReviewAuthor, TimeSlotsModal, TimeSlotItem, CloseButton, ServicesSelect, ServiceOption, ThankYouNote } from './ViewBusinessElements';

const ViewBusiness = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [showThankYou, setShowThankYou] = useState(false);

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

    const services = [
        "Toilet Unclogging",
        "Sink Repair",
        "The Joe Special"
    ];

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setShowThankYou(false);
    };

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
    };

    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
        setShowThankYou(true);
    };

    const closeTimeSlotsModal = () => {
        setSelectedDay(null);
        setSelectedService("");
        setSelectedTimeSlot("");
        setShowThankYou(false);
    };

    const BusinessUpdateAvailability = (businessID) => {
        const [day, setDay] = useState('');
        const [times, setTimes] = useState('');
        const [business, setBusiness] = useState(null);
        const [error, setError] = useState(null);

        const handleSubmit = async (e) => {
            e.preventDefault();

            const newAvailability = {
                day: parseInt(day, 10),
                times: [{ times }],
            };

            try {
                const response = await axios.patch(`http://localhost:5000/businesses/${businessID}/availability`, {
                    availability: newAvailability,
                });
                setBusiness(response.data);
            } catch (err) {
                setError(err.message);
            }
        };
    };

    return (
        <Container>
            <Icon to="/">THE FEED</Icon>
            <FormWrap>
                <DashboardContent>
                    <Section>
                        <Title>Joe Toilet</Title>
                        <ProfitCounter>Profit: $129,345</ProfitCounter>
                        <Text>Business Rating: ★★★★★</Text>
                        <Text>Description: We're the best plumbers in the bizz. Come on down to Joe toilet for all your toilet needs, heck we even do sinks.</Text>
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
                        {services.map((service, index) => (
                            <ServiceOption key={index} value={service}>{service}</ServiceOption>
                        ))}
                    </ServicesSelect>
                    {timeSlots.map((slot, index) => (
                        <TimeSlotItem key={index} onClick={() => handleTimeSlotClick(slot)}>{slot}</TimeSlotItem>
                    ))}
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
