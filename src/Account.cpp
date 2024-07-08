//
// Created by Cody on 7/2/2024.
//
#include "Account.h"

void Account::generateAccounts(std::vector<Account>& vector, unsigned int numberOfAccounts) {
    char alph[26];
    Permissions permission[3] = {ADMIN,CUSTOMER,BUSINESS};

    for(unsigned int i = 0; i < 26;i++){
        alph[i] = 'A'+i;
    }



    for(unsigned int i = 0; i < numberOfAccounts;i++){
        Account account = {};

        account.permission = permission[rand() % 3];
        for(unsigned int i = 0; i < 10;i++){

            account.email.push_back(alph[rand() % 26]);
            account.password.push_back(alph[rand() % 26]);
            account.fullName.push_back(alph[rand() % 26]);
            account.address.push_back(alph[rand()%26]);
            if(account.permission == BUSINESS){
                account.nameOfBusiness.push_back(alph[rand() % 26]);
                Booking booking = {};
                std::pair<Booking,std::string> pair;
                pair.first = booking;

                pair.second = account.email;
                account.bookings.push_back(pair);
            }

        }
        vector.push_back(account);

    }
}

void Account::printAccounts(std::vector<Account> &vec) {
    for(auto& i: vec){
        std::cout<<"email: "<<i.email<<std::endl;
        std::cout<<"pass: "<<i.password<<std::endl;
        if(i.permission == BUSINESS){
            std::cout<<"Business Name: "<<i.nameOfBusiness<<std::endl;
        }
    }
}

unsigned int Account::hashPassword() {
    unsigned int hash = 0;
    for(unsigned int i = 0; i < password.length();i++){
        hash+=password[i]<<i;
    }
    return hash;
}

void Account::giveDiscount(Account &account, unsigned int discount) {
    if(account.permission !=BUSINESS){
        std::cout<<"Only Business Accounts May Apply Discounts!"<<std::endl;
        return;
    }

    for(auto& i: account.bookings){
        if(int(i.first.price-discount) <=0){
            i.first.price = 0;
            continue;
        }
        i.first.price-=discount;
    }
}

void Account::printDiscountsTest(std::vector<Account> &vec) {
    for(unsigned int i = 0; i < vec.size();i++){
        if(vec[i].permission == BUSINESS){
            std::cout<<"Price before discount "<<vec[i].bookings[0].first.price<<std::endl;
            giveDiscount(vec[i],10);
            std::cout<<"Price after discount "<<vec[i].bookings[0].first.price<<std::endl;
            break;
        }
    }
}

bool Account::authenticateAccount(std::unordered_map<unsigned int, Account> &account, Account& accountToVerify) {

    if(account.find(accountToVerify.hashPassword())==account.end()) {
        return false;
    }
    if(account[accountToVerify.hashPassword()].email!= accountToVerify.email) {
        return false;
    }
    return true;
}

void Account::manageBookings(std::string time, Account& account) {
    if(permission!= BUSINESS) {
        return;
    }
    for(auto& i : bookings) {
        if(!(i.second.compare(account.email))) {
            continue;
        }
        i.first.time = time;
    }

}

