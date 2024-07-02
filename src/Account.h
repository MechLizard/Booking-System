#pragma once
#include <vector>
#include <string>
#include <iostream>

enum Permissions{
    ADMIN,
    CUSTOMER,
    BUSINESS,
};


struct Booking{
    unsigned int price;
    std::string time;
};


struct Account{
    std::string email;
    std::string password;
    Permissions permission;
    std::string phoneNumber;
    std::string nameOfBusiness;

    std::vector<Booking> bookings;
    void generateAccounts(std::vector<Account>& vector, unsigned int numberOfAccounts);
    void printAccounts(std::vector<Account>& vec);
    unsigned int hashPassword(std::string password);
    void giveDiscount(Account& account, unsigned int discount);
    void printDiscountsTest(std::vector<Account>& vec);
};
