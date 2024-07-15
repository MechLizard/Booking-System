#include <iostream>
#include <string>
#include <vector>
#include <random>
#include "Account.h"


int main(){
    srand(time(nullptr));
    std::cout<<"Hello World"<<std::endl;
    std::vector<Account> vec;
	Account account = {};
    account.generateAccounts(vec,155);

    account.printAccounts(vec);
    std::cout<<"Testing hash: "<<account.hashPassword()<<std::endl;
    account.printDiscountsTest(vec);
	std::cout<<"Test to see if clion works"<<std::endl;

}
