import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Container, FormWrap, Icon, DashboardContent, Section, Title, Text, Calendar, Reviews,
    ProfitCounter, CalendarHeader, CalendarBody, DayNames, DayBox, DayName, CalendarGrid,
    ReviewItem, ReviewText, ReviewAuthor, TimeSlotsModal, TimeSlotItem, CloseButton,
    ServicesSelect, ServiceOption, ThankYouNote, ReviewFormContainer, ReviewTextarea,
    SubmitButton, StarRating, Star, BusinessComment
} from './ViewBusinessElements';

const ViewBusiness = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [showThankYou, setShowThankYou] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewAvailability, setReviewAvailability] = useState('');
    const [business, setBusiness] = useState(null);

    // Get the business ID from the URL
    const { id } = useParams();

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
        //console.log(business.name);
        //console.log(business.availability);
    };

    // Event handler for service selection
    const handleServiceChange = (e) => {
        setSelectedService(e.target.value); // Keep service as a string
    };

    // Creates and sends new booking object when customer clicks book
    const handleTimeSlotClick = async (slot) => {
        const userId = localStorage.getItem('userId');

        try {
            // Fetch customer details using userId from local storage (saved at signin)
            const customerResponse = await axios.get(`http://localhost:8000/users/${userId}`);
            const customerEmail = customerResponse.data.email;
            const customerPhone = customerResponse.data.phone;
            const customerName = customerResponse.data.name;

            // Fetch business details
            const businessName = business.name;
            const businessPhone = business.phone;

            // Find the selected service and extract the price
            const selectedServiceObj = business.servicesOffered.find(service => service.service === selectedService);
            const service = selectedService;
            const price = selectedServiceObj.price; // Extract the price

            // Booking object
            const newBooking = {
                customerEmail: customerEmail,
                customerPhone: customerPhone,
                customerName: customerName,
                service: service,
                price: price,
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

    // Event handler for review form submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        try {
            // Fetch customer details using userId from local storage (saved at signin)
            const customerResponse = await axios.get(`http://localhost:8000/users/${userId}`);
            const customerName = customerResponse.data.name;

            // Review object
            const newReview = {
                customerName: customerName,
                rating: reviewRating,
                customerComment: reviewText,
                businessComment: "", // Initially empty
                availability: reviewAvailability,
            };

            // Add review to business' reviews array
            await axios.patch(`http://localhost:8000/businesses/${id}/reviews`, { review: newReview });

            // Fetch the updated business data including the new review
            const updatedBusinessResponse = await axios.get(`http://localhost:8000/businesses/${id}`);
            const updatedBusiness = updatedBusinessResponse.data;

            // Recalculate the average rating
            const averageRating = calculateAverageRating(updatedBusiness.reviews);

            // Update the business with the new average rating
            await axios.patch(`http://localhost:8000/businesses/${id}/updateRating`, { averageRating });

            // Update the state with the new business data
            setBusiness(updatedBusiness);
            setReviewText("");
            setReviewRating(0);
            setReviewAvailability("");
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    // Function to calculate average rating
    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        return Math.round(averageRating);
    };

    return (
        <Container style={{ height: '100vh', overflowY: 'auto' }}>
            <Icon to="/customer-dashboard">THE FEED</Icon>
            <FormWrap>
                <DashboardContent style={{ height: '100vh', overflowY: 'auto' }}>
                    <Section>
                        <Title>{business.name}</Title>
                        <Text>Business Rating: {business.rating}★</Text>
                        <Text>Description: {business.description}</Text>
                        <Text>Phone: {business.phone}</Text>
                        <Text>Zipcode: {business.zipcode}</Text>
                    </Section>
                    <Section>
                        <Title>Calendar</Title>
                        <Calendar>
                            <CalendarHeader>
                                <Text>August 2024</Text>
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
                            {business.reviews.map((review, index) => (
                                <ReviewItem key={index}>
                                    <ReviewText>"{review.customerComment}"</ReviewText>
                                    <ReviewAuthor>- {review.customerName}</ReviewAuthor>
                                    <StarRating>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <Star key={i} filled={i < review.rating}>★</Star>
                                        ))}
                                    </StarRating>

                                    {/* Display business comment */}
                                    {review.businessComment && (
                                        <BusinessComment>
                                            Business Comment: "{review.businessComment}"
                                        </BusinessComment>
                                    )}
                                </ReviewItem>
                            ))}
                        </Reviews>
                        <ReviewFormContainer onSubmit={handleReviewSubmit}>
                            <Title>Leave a Review</Title>
                            <StarRating>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star key={i} filled={i < reviewRating} onClick={() => setReviewRating(i + 1)}>★</Star>
                                ))}
                            </StarRating>
                            <ReviewTextarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Write your review here..."
                            />
                            <SubmitButton type="submit">Submit Review</SubmitButton>
                        </ReviewFormContainer>
                    </Section>
                </DashboardContent>
            </FormWrap>
            {selectedDay !== null && (
                <TimeSlotsModal>
                    <CloseButton onClick={closeTimeSlotsModal}>Close</CloseButton>
                    <Title>Time Slots for August {selectedDay}, 2024</Title>
                    <ServicesSelect onChange={handleServiceChange} value={selectedService}>
                        <option value="">Select a Service</option>
                        {business.servicesOffered.map((service, index) => (
                            <option key={index} value={service.service}>
                                {service.service} - ${service.price}
                            </option>
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
                            Thank you for booking {selectedService} for Wednesday August {selectedDay}, 2024 at {selectedTimeSlot.split('-')[0]}.
                        </ThankYouNote>
                    )}
                </TimeSlotsModal>
            )}
        </Container>
    );
};

export default ViewBusiness;
