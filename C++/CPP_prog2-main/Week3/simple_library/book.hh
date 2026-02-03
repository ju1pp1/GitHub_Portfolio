#ifndef BOOK_HH
#define BOOK_HH
#include "string"
#include "date.hh"

class Book
{
public:
    Book(std::string author, std::string title/*, bool loaned*/);
    void print() const;
void loan(Date& date);
void renew();
void give_back();

private:
std::string author_;
std::string title_;
bool available_ = true;
Date date_;
Date loaningdate_;
Date returningdate_;
bool check_ = false;
};

#endif // BOOK_HH
