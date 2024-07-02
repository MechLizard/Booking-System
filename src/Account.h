#pragma once
#include <vector>
#include <string>
#include <iostream>
#include <unordered_map>

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

    std::vector<std::pair<Booking,std::string>> bookings;
    void generateAccounts(std::vector<Account>& vector, unsigned int numberOfAccounts);
    void printAccounts(std::vector<Account>& vec);
    unsigned int hashPassword();
    void giveDiscount(Account& account, unsigned int discount);
    void printDiscountsTest(std::vector<Account>& vec);
    // The authentication function needs way more work. It stores the hash password of an account, and maps it to an account, but the way we
    // Authenticate is wishy washy. I just added a basic check to make sure that the account emails match, and if they do, they are in which does not seem
    // like very good authentication
    bool authenticateAccount(std::unordered_map<unsigned int, Account>& account, Account& accountToVerify);
    void manageBookings(std::string time, Account& account);
};
