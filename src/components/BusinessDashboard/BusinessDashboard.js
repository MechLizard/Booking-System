// BusinessPOV of Business dashboard SET AVAILABILITY HERE ADALYS

import React, { useState } from 'react';
import { Container, FormWrap, Icon, DashboardContent, Section, Title, Text, Calendar, Reviews, ProfitCounter, CalendarHeader, CalendarBody, DayNames, DayBox, DayName, CalendarGrid, ReviewItem, ReviewText, ReviewAuthor, TimeSlotsModal, TimeSlotItem, CloseButton, ServicesSelect, ServiceOption, ThankYouNote, AvailabilityForm, SubmitButton } from './BusinessDashboardElements';

const BusinessDashboard = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [showThankYou, setShowThankYou] = useState(false);

    const [ business, setBusiness ] = useState(null); // will become business "object"
    const [ error, setError ] = useState(null);

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
