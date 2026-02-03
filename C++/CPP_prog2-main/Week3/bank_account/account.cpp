#include "account.hh"
#include <iostream>

Account::Account(const std::string& owner, /*string iban,*/ bool has_credit/*, int credits*/):
    owner_(owner), /*iban_(iban),*/ has_credit_(has_credit)/*, credits_(credits)*/
{
    generate_iban();

}
//string current_account();
// Setting initial value for the static attribute running_number_
void Account::print() const{
    std::cout << owner_ << " : " << iban_ << " : " << credits_ << " euros" << endl;
}
void Account::set_credit_limit(int num){
if (credits_ < num && has_credit_ == false){
    std::cout << "Cannot set credit limit: the account has no credit card" << endl;
}
}
void Account::save_money(int num){
//std::cout << num << endl;
    credits_ += num;
}
void Account::take_money(int num){
    //Account current_account(iban_ = "FI00 1234 01", this->credits_);
    //Account credit_card_account(iban_ = "FI00 1234 03", credits_);

    int takemoney = credits_ - num;
    if(/*iban_ == "FI00 1234 01" &&*/ takemoney > 0){
    credits_ -= num;
    std::cout << num << " euros taken: new balance of " << iban_ << " is " << credits_ << " euros" << endl;
    }

    if(takemoney < 0 && iban_ == "FI00 1234 03"){
        if(credits_ < 0){
            std::cout << "Cannot take money: credit limit overflow" << endl;
        }
        else {
            credits_ -= num;
            std::cout << num << " euros taken: new balance of " << iban_ << " is " << credits_ << endl;
        }
    }
    else if(takemoney < 0){
        std::cout << "Cannot take money: balance underflow" << endl;
    }
    /*int maketransfer = credits_ -= num;
    if(credits_ > 0){

        credits_ = maketransfer;
    }
        else if(credits_ < 0){
            credits_ += num;
            std::cout << "Cannot take money: balance underflow" << endl;
        } */
    //std::cout << num << " euros taken: new balance of " << iban_ << " is " << credits_ << " euros" << endl;
    }

void Account::transfer_to(Account& account, int num){
if(account.iban_ == "FI00 1234 03"){
    account.credits_ += num;

    if(iban_ == "FI00 1234 02"){
        credits_ -= num;

        std::cout << num << " euros taken: new balance of " << iban_ << " is " << credits_ << " euros" << endl;
    }
}
if(account.iban_ == "FI00 1234 01"){
    int transfer = account.credits_ -= num;
    if(transfer < 0){
        std::cout << "Cannot take money: balance underflow" << endl;
        std::cout << "Transfer from " << iban_ << " failed" << endl;
        account.credits_ += num;

    }
}
if(account.iban_ == "FI00 1234 02"){
    if(credits_ < 0){
        std::cout << "Cannot take money: credit limit overflow" << endl;
        std::cout << "Transfer from " << iban_ << " failed" << endl;
    }
    else {
        //int transfer2 = account.credits_ += num;
        if(iban_ == "FI00 1234 03"){
            credits_ -= num;
            account.credits_ += num;
            std::cout << num << " euros taken: new balance of " << iban_ << " is " << credits_ << " euros" << endl;
        }
    }


}

}

int Account::running_number_ = 0;

void Account::generate_iban()
{
    ++running_number_;
    std::string suffix = "";
    if(running_number_ < 10)
    {
        suffix.append("0");
    }
    else if(running_number_ > 99)
    {
        std::cout << "Too many accounts" << std::endl;
    }
    suffix.append(std::to_string(running_number_));

    iban_ = "FI00 1234 ";
    iban_.append(suffix);
}
