#include <iostream>
#include <cmath>

using namespace std;

unsigned long int result(int number1){
    int i;
    unsigned long int tsum = 1;
    int j;

    for(i = 1; i <= number1; i++){
        tsum = 0;
        for(j = 1; j <= i; j++){
            if (tsum == 0){
                tsum += 1;
            }

            tsum *= j;
            
            if(j < i){
                
            }
        }
        
    }
    
    return tsum;
}

unsigned long int result2(int number1, int number2){
    int i;
    unsigned long int tsum = 1;
    int j;

    number2 = number1 - number2;
    for(i = 1; i <= number2; i++){
        tsum = 0;
        for(j = 1; j <= i; j++){
            if (tsum == 0){
                tsum += 1;
            }

            tsum *= j;
            if(j < i){

            }
        }
    }
    return tsum;
}
unsigned long int result3(int number1){
    int i;
    unsigned long int tsum = 1;
    int j;

    for(i = 1; i <= number1; i++){
        tsum = 0;
        for(j = 1; j <= i; j++){
            if (tsum == 0){
                tsum += 1;
            }
            tsum *= j;
            if(j < i){
            }
        }
    }
    return tsum;
}

int main()
{

    int lottopallot;
    int drawnballs;

    cout << "Enter the total number of lottery balls: ";
    cin >> lottopallot;
    cout << "Enter the number of drawn balls: ";
    cin >> drawnballs;

    if(lottopallot <= 0){
        cout << "The number of balls must be a positive number." << endl;
        return 0;
    }
    else if(drawnballs <= 0){
        cout << "The number of balls must be a positive number." << endl;
        return 0;
    }
    cout << "The probability of guessing all " << drawnballs << " balls correctly is 1/" << result(lottopallot) / (result2(lottopallot, drawnballs) * result3(drawnballs)) << endl;

    return 0;
}
