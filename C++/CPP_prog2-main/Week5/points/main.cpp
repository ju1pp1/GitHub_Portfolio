#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <set>
#include <unordered_map>
#include <algorithm>

using namespace std;

int main()
{
    string filename = "";
    cout << "Input file: ";
    getline(cin, filename);

    ifstream input_object(filename);

    if(not input_object){
        cout << "Error! The file " << filename << " cannot be opened.";
        return EXIT_FAILURE;
    } else {
        cout << "Final scores:" << endl;

        string line;
        unordered_map<string, int> players = {};
        unordered_map<string, int> players2(players);
        players = players2;

        while(getline(input_object, line)) {
            for(unsigned int i = 0; i < line.length(); i++){
                if(line.at(i) == ':') {
                    //find :
                    //cout << line.substr(0, i) << endl; //player name
                    string test =  line.substr(0, i);
                    //cout << line.substr(i+1, line.length()) << endl; //points
                    string test2 = line.substr(i+1, line.length());
                    players.insert({test, 0});
                    int test3 = 0;
                    test3 += stoi(test2);

                    unordered_map<string, int>::iterator iter;
                    iter = players.begin();
                    while (iter != players.end()) {
                        if(iter->first == test) {
                            iter->second += test3;
                        }
                        //cout << iter->first << " " << iter->second << endl;
                        ++iter;
                    }

                    //Does map contain it?
                    /*if(players.find(test) != players.end()){
                        cout << "found: " << players.at(test) << endl;
                    } else {
                        cout << "nothing" << endl;
                    }*/
                }
            }
            //cout << line << endl;
        }
        //sort(players.begin(), players.end());
        for(auto test : players){
            cout << test.first << ": " << test.second << endl;

        }
        EXIT_SUCCESS;
    }

    /*
     * Can we find the input file.
     *
    ifstream tiedosto_olio("inputfile");
       if (tiedosto_olio){
           cout << "success";
       } else{
           cout << "error";
    }*/

    return 0;
}
