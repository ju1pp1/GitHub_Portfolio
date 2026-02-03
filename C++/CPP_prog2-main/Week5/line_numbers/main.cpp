#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main()
{

    string input_file = "";
    cout << "Input file: ";
    getline(cin, input_file);
    string output_file = "";
    cout << "Output file: ";
    getline(cin, output_file);

    ifstream input_object(input_file, ios::in);
    ofstream output_object(output_file, ios::out);

    if(not input_object) {
        cout << "Error! The file not_existing.input cannot be opened." << endl;
        return EXIT_FAILURE;
    } else {
        int number = 1;
        string line = " ";
        char space = ' ';
            while(getline(input_object, line)){
                    output_object << number++ << space << line << "\n";
                }
        }
        /*
         *Lue tiedosto.
         * while(input_object.get(input_char)) {
            cout << input_char;
        }*/

        input_object.close();
        output_object.close();


    //}

    /*
     * Testaa löytyykö tiedosto
     *

     ifstream tiedosto_olio("outputfile");
        if (tiedosto_olio){
            cout << "onnistui";
        }
        else{
            cout << "Virhe";
    } */

    return 0;


}
