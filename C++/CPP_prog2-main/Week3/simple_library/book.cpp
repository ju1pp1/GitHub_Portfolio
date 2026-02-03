#include "book.hh"
#include "iostream"
#include "date.hh"

Book::Book(std::string author, std::string title):
    author_(author), title_(title), date_()
{

}
void Book::print() const{
    std::cout << author_ << " : " << title_ << std::endl;

}
void Book::loan(Date& date){
loaningdate_ = date;
returningdate_ = date;
    if(available_ == true){
        std::cout << "- available" << std::endl;
        available_ = false;
    }
    else if (available_ == false && check_ == false){
        std::cout << "Already loaned: cannot be loaned" << std::endl;
        check_ = true;

    }
    else if(available_ == false && check_ == true){
renew();
    }
    /*else if(available_ == false && check_ == true){
        loaningdate_ = date;
        std::cout << "- loaned: "; loaningdate_.print();
        date.advance(28);
        returningdate_ = date;
        std::cout << "- to be returned: "; returningdate_.print();
        available_ = false;
    }*/

}
void Book::renew(){
if(available_ == false){
    loaningdate_.advance(-14);
    std::cout << "- loaned: "; loaningdate_.print();
    returningdate_.advance(14);
    std::cout << "- to be returned: "; returningdate_.print();
}
if(available_ == true){
    //loaningdate_.advance(-14);
    std::cout << "- loaned: "; loaningdate_.print();
    returningdate_.advance(28);
    std::cout << "- to be returned: "; returningdate_.print();
}
}
void Book::give_back(){
 if(available_ == false){
    available_ = true;
//std::cout << "returned" << std::endl;
 }
     //std::cout << "Not loaned: cannot be renewed" << std::endl;

}
