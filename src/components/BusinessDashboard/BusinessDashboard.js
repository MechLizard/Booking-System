import React, { useState, useEffect } from 'react';
import {
    Container, FormWrap, Icon, DashboardContent, Section, Title, Text, Calendar, Reviews, ProfitCounter,
    CalendarHeader, CalendarBody, DayNames, DayBox, DayName, CalendarGrid, ReviewItem, ReviewText, ReviewAuthor,
    TimeSlotsModal, TimeSlotItem, CloseButton, AvailabilityForm, SubmitButton, BookingsContainer, BookingItem,
    AddServiceModal, AddServiceForm, AddServiceButton, FormGroup, Label, Input,
    DescriptionForm, DescriptionTextarea, CommentForm, CommentTextarea, StarRating, Star, BusinessComment
} from './BusinessDashboardElements.js';
import axios from 'axios';

const BusinessDashboard = () => {

    // States for set availability
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [showThankYou, setShowThankYou] = useState(false);

    // Modal states
    const [showAddServiceModal, setShowAddServiceModal] = useState(false); // Add service modal visibility state
    const [showBookingsModal, setShowBookingsModal] = useState(false);
    const [showTimeSlotsModal, setShowTimeSlotsModal] = useState(false);

    // States for get business data
    const [business, setBusiness] = useState(null); // will become business "object"
    const [error, setError] = useState(null);

    // States for set service
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [servicesOffered, setServicesOffered] = useState([]);

    // States for description
    const [newDescription, setNewDescription] = useState("");
    const [showDescription, setShowDescription] = useState(false);

    // States for commenting
    const [commentText, setCommentText] = useState('');
    const [commentingReviewId, setCommentingReviewId] = useState(null);

    // State for profit counter
    const [totalProfit, setTotalProfit] = useState(0);

    //Function to calculate profit by bookings
    const calculateTotalProfit = (bookings) => {
        return bookings.reduce((total, booking) => total + booking.price, 0);
    };

    // This function fetches the business data based on the locally saved userID
    useEffect(() => {
        const fetchBusinessDetails = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8000/businesses/${userId}`);
                    setBusiness(response.data);
                    setServicesOffered(response.data.servicesOffered);
                    setSelectedAvailability(response.data.availability || []);
                    // Calculate and set the total profit
                    const total = calculateTotalProfit(response.data.booking || []);
                    setTotalProfit(total);
                } catch (error) {
                    console.error('Error fetching business details:', error);
                }
            }
        };

        fetchBusinessDetails();
    }, []);

    // Generated array for days in the month
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

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

// Event handler for day clicks
    const handleDayClick = (day) => {
        setSelectedDay(day);
        setShowTimeSlotsModal(true);
    };

// Event handler for time slot selection
    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlots(prev => {
            const newSlots = { ...prev };
            const daySlots = newSlots[selectedDay] || [];
            if (daySlots.includes(slot)) {
                newSlots[selectedDay] = daySlots.filter(s => s !== slot);
            } else {
                newSlots[selectedDay] = [...daySlots, slot];
            }
            return newSlots;
        });
    };

    // Set availability for business
    const handleAvailabilitySet = async (e) => {
        e.preventDefault();

        const newAvailability = {
            day: selectedDay,
            times: selectedTimeSlot
        };

        // sort availability by day??

        try {
            const userId = localStorage.getItem('userId');
            const res = await axios.patch(`http://localhost:8000/businesses/${userId}/availability`, { availability: newAvailability });

            setBusiness(res.data);
            setSelectedAvailability(res.data.availability);
        } catch (err) {
            setError(err.message);
        }
    };

// Event handler for save availability
    const handleSaveAvailability = async (e) => {
        e.preventDefault(); // Ensure form submission is prevented
        const userId = localStorage.getItem('userId');
        console.log(userId);
        if (userId && selectedDay !== null) {
            const newAvailability = {
                day: selectedDay,
                times: selectedTimeSlots[selectedDay] || []
            };
            try {
                const res = await axios.patch(`http://localhost:8000/businesses/${userId}/availability`, { availability: newAvailability });
                setBusiness(res.data);
                setSelectedAvailability(res.data.availability);
                setShowTimeSlotsModal(false); // Hide the modal after saving
                setSelectedTimeSlots(prev => ({ ...prev, [selectedDay]: [] })); // Reset time slots for selected day
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Add new service
    const handleAddService = async (e) => {
        e.preventDefault();

        // Validate input
        if (!service || !price) {
            setError('Service and price are required');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User ID not found in local storage');
                return;
            }

            const response = await axios.patch(`http://localhost:8000/businesses/${userId}/services`, {
                service,
                price: Number(price) // Ensure the price is sent as a number
            });

            console.log('Updated business:', response.data); // For debugging
            setService(""); // Clears input field after successful submission
            setPrice(""); // Clears input field after successful submission
            setError(null); // Clears existing errors
        } catch (error) {
            console.error('Error updating services:', error);
            setError('Error updating services');
        }
    };

    // Event handler for description
    const handleAddDescription = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.patch(`http://localhost:8000/businesses/${business._id}/description`, { description: newDescription });

            setBusiness(res.data);
            setNewDescription("");
            setShowDescription(false);

        } catch (err) {
            setError(err.message);
        }
    };


    // Toggle add service modal
    const toggleAddServiceModal = () => setShowAddServiceModal(!showAddServiceModal);

    // Event handler for bookings button
    const handleSeeBookings = () => {
        setShowBookingsModal(true);
    };

    // Event handler for close button on bookings modal
    const handleCloseBookingsModal = () => {
        setShowBookingsModal(false);
    };

    if (!business) {
        return <Container>Loading...</Container>;
    }

// Event handler for comment submit
    const handleCommentSubmit = async (reviewId) => {
        //console.log('----Handling comment submit----'); // For debugging
       // console.log(`Review ID: ${reviewId}`); // For debugging
        //console.log(`Comment Text: ${commentText}`); // For debugging

        try {
            if (commentText.trim()) {
                //console.log('Submitting comment'); // For debugging
                await updateBusinessComment(business._id, reviewId, commentText);
                setCommentText(''); // Clear the comment text
                setCommentingReviewId(null); // Reset the commenting review ID
                //console.log('Comment submitted successfully'); // For debugging
            } else {
                const errorMessage = 'Comment cannot be empty';
                //console.log(errorMessage); // For debugging
                setError(errorMessage);
            }
        } catch (error) {
            const errorMessage = 'Failed to submit comment';
            console.error(`${errorMessage}: ${error.message}`); // For debugging
            setError(errorMessage);
        }
    };

// Comment submission function
    async function updateBusinessComment(businessId, reviewId, businessComment) {
        try {
            const url = `http://localhost:8000/businesses/${businessId}/reviews/${reviewId}/business-comment`;
            //console.log('Updating business comment with URL:', url); // For debugging

            const response = await axios.patch(url, {
                businessComment
            });

            //console.log('Updated business:', response.data);
        } catch (error) {
            console.error('Error updating business comment:', error.response?.data?.msg || error.message); // For debugging
        }
    }


    return (
        <Container style={{ height: '100vh', overflowY: 'auto' }}>
            <Icon to="/">THE FEED</Icon>
            <FormWrap>
                <DashboardContent style={{ height: '100vh', overflowY: 'auto' }}>

                    {/* BUSINESS DATA */}
                    <Section>
                        <Title>{business.name}</Title>
                        <ProfitCounter>
                            Booked Services Profit: ${totalProfit}
                        </ProfitCounter>
                        <Text>Business Rating: {business.rating}★</Text>
                        <Text>Description: {business.description}</Text>
                        {DescriptionForm && (
                            <form onSubmit={handleAddDescription}>
                                <DescriptionTextarea
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder="Enter description here"
                                    required
                                />
                                <SubmitButton type="submit">Update Description</SubmitButton>
                            </form>
                        )}
                    </Section>

                    {/* CALENDAR*/}
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
                                        <DayBox
                                            key={day}
                                            onClick={() => handleDayClick(day)}
                                            hasAvailability={selectedAvailability.some(avail => avail.day === day)}
                                        >
                                            {day}
                                        </DayBox>
                                    ))}
                                </CalendarGrid>
                            </CalendarBody>
                        </Calendar>
                        <AddServiceButton onClick={toggleAddServiceModal}>Add New Service</AddServiceButton>
                        <AddServiceButton onClick={handleSeeBookings}>See Bookings</AddServiceButton>
                    </Section>

                    {/* REVIEWS */}
                    <Section>
                        <Title>Reviews</Title>
                        <Reviews>
                            {business.reviews.map((review) => (
                                <ReviewItem key={review._id}>
                                    <ReviewText>"{review.customerComment}"</ReviewText>
                                    <ReviewAuthor>- {review.customerName}</ReviewAuthor>
                                    <StarRating>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <Star key={i} filled={i < review.rating}>★</Star>
                                        ))}
                                    </StarRating>

                                    {/* Business comment */}
                                    {review.businessComment && (
                                        <BusinessComment>
                                            {business.name}: "{review.businessComment}"
                                        </BusinessComment>
                                    )}

                                    <CommentForm onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(review._id); }}>
                                        <CommentTextarea
                                            value={commentingReviewId === review._id ? commentText : ''}
                                            onChange={(e) => {
                                                setCommentText(e.target.value);
                                                setCommentingReviewId(review._id);
                                            }}
                                            placeholder="Add a comment..."
                                        />
                                        <SubmitButton type="submit">Add Comment</SubmitButton>
                                    </CommentForm>
                                </ReviewItem>
                            ))}
                        </Reviews>
                    </Section>
                </DashboardContent>
            </FormWrap>

            {showTimeSlotsModal && (
                <TimeSlotsModal>
                    <Title>Set Availability for August {selectedDay}, 2024</Title>
                    <AvailabilityForm onSubmit={handleSaveAvailability}>
                        {timeSlots.map((slot, index) => (
                            <TimeSlotItem
                                key={index}
                                onClick={() => handleTimeSlotClick(slot)}
                                selected={selectedTimeSlots[selectedDay]?.includes(slot)}
                            >
                                {slot}
                            </TimeSlotItem>
                        ))}
                        <SubmitButton type="submit">Save Availability</SubmitButton>
                        {error && <Text>Error: {error}</Text>}
                    </AvailabilityForm>
                    <CloseButton onClick={() => setShowTimeSlotsModal(false)}>Close</CloseButton>
                </TimeSlotsModal>
            )}

            {showBookingsModal && (
                <BookingsModal bookings={business.booking} onClose={handleCloseBookingsModal} />
            )}

            {showAddServiceModal && (
                <AddServiceModal>
                    <Title>Add New Service</Title>
                    <AddServiceForm onSubmit={handleAddService}>
                        <FormGroup>
                            <Label for="service">Service</Label>
                            <Input
                                type="text"
                                id="service"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </FormGroup>
                        <SubmitButton type="submit">Add Service</SubmitButton>
                        {error && <Text>Error: {error}</Text>}
                    </AddServiceForm>
                    <CloseButton onClick={toggleAddServiceModal}>Close</CloseButton>
                </AddServiceModal>
            )}
        </Container>
    );
};

const BookingsModal = ({ bookings, onClose }) => (
    <TimeSlotsModal>
        <Title>Bookings</Title>
        <BookingsContainer>
            {bookings.map((booking, index) => (
                <BookingItem key={index}>
                    <Text>Date: {booking.day} August 2024</Text>
                    <Text>Time: {booking.Time}</Text>
                    <Text>Service: {booking.service}</Text>
                    <Text>Price: ${booking.price}</Text>
                    <Text>Customer Name: {booking.customerName}</Text>
                    <Text>Customer Email: {booking.customerEmail}</Text>
                    <Text>Customer Phone: {booking.customerPhone}</Text>
                </BookingItem>
            ))}
        </BookingsContainer>
        <CloseButton onClick={onClose}>Close</CloseButton>
    </TimeSlotsModal>
);

export default BusinessDashboard;
