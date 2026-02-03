#include <iostream>

using namespace std;

int main()
{
    int luku;
    int divided = 0;
    int remainder = 0;
    int i;

    cout << "Enter a positive number: ";
    cin >> luku;
    if (luku > 0){
        for(i = 1; i * i <= luku; i++){

            if(luku % i == 0){
                divided = luku / i; //remainder = 4 % luku;
                remainder = i; //remainder = i;//divided = luku / 4;
            }

            }
        cout << luku << " = " << remainder << " * " << divided << endl;

    }
    else {
        cout << "Only positive numbers accepted" << endl;

    }

    return 0;
}
