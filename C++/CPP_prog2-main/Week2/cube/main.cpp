//
#include <iostream>
#include <cmath>

using namespace std;

int main()
{
    int luku = 0;
    int long calculateCorrect;
    int long calculateWrong;

    cout << "Enter a number: ";
    cin >> luku;

    calculateWrong = luku * luku * luku;
    calculateCorrect = pow(luku, 3);

    if (calculateCorrect != calculateWrong){

        cout << "Error! The cube of " << luku << " is not " << calculateWrong << "." << endl;
    }
    else {

        cout << "The cube of " << luku << " is " << calculateCorrect << "." << endl;
    }

    return 0;
}
