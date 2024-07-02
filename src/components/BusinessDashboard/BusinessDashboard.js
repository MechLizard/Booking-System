import React from 'react';
import { Container, FormWrap, Icon, DashboardContent, Section, Title, Text, Calendar, Reviews, ProfitCounter } from './BusinessDashboardElements';

const BusinessDashboard = () => {
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
                        <Text>Business Hours: Mon-Fri 9AM - 5PM</Text>
                    </Section>
                    <Section>
                        <Title>Calendar</Title>
                        <Calendar>
                            {/* Placeholder */}
                        </Calendar>
                    </Section>
                    <Section>
                        <Title>Reviews</Title>
                        <Reviews>
                            {/* Placeholder */}
                        </Reviews>
                    </Section>
                </DashboardContent>
            </FormWrap>
        </Container>
    );
};

export default BusinessDashboard;
