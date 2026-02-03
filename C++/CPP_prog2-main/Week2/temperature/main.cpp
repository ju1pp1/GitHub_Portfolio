#include <iostream>

using namespace std;

int main()
{
    int temperature = 0;
    cout << "Enter a temperature: ";
    cin >> temperature;

    //lämpötilalukema -> Celsius-asteina: (x * 1.8) + 32
    double celsius = temperature * 1.8 + 32;
    cout << temperature << " degrees Celsius is " << celsius << " degrees Fahrenheit" << endl;

    //Lämpötilalukema -> Fahrenheit-asteina: (x - 32) / 1.8
    double fahrenheit = (temperature - 32) / 1.8;
    cout << temperature << " degrees Fahrenheit is " << fahrenheit << " degrees Celsius" << endl;
    return 0;
}
