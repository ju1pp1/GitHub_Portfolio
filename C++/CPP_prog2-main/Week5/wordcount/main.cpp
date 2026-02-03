#include <iostream>
#include <string>
#include <fstream>
#include <map>
#include <set>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>
#include <sstream>

using DATA_STRUCT = std::map<std::string, std::set<int>>;

void read_input_file(DATA_STRUCT &rows_data, std::string filename);

void convert_to_output_line(DATA_STRUCT::const_iterator iter);

void print_out_data(DATA_STRUCT const &rows_data);

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
        DATA_STRUCT rows_data = {};
        read_input_file(rows_data, filename);
        print_out_data(rows_data);
        /*string line;
    unordered_set<int> endnumber;
    unordered_map<string, int> wordcountt;
    unordered_map<string, int> wordcount2(wordcountt);
    unordered_set<string> word;
    map<string, int> wordcount;


    while(getline(input_object, line)) {

    } */
    return EXIT_SUCCESS;
    }


     /* Can we find the input file.

    ifstream tiedosto_olio("highway");
       if (tiedosto_olio){
           cout << "onnistui";
       } else{
           cout << "Virhe";
    } */

    return 0;
}
void read_input_file(DATA_STRUCT &rows_data, std::string filename){
    //yritä avata tiedosto
    std::ifstream file(filename);
    if(!file)
    {
        //error and exit
        cout << "Error! The file " << filename << " cannot be opened.";
        return;
    }
    string line = "";
    string word = "";
    int row_counter = 1;
    while(getline(file, line)) {
        istringstream words(line);
        while(words >> word)
        {
            if(rows_data.find(word) == rows_data.end())
            {
                rows_data.insert({word, {}});
            }
            rows_data.at(word).insert(row_counter);
        }
        row_counter++;
    }
}

void convert_to_output_line(DATA_STRUCT::const_iterator iter)
{
    string key = iter->first;
    set<int> row_numbers = iter->second;

    cout << key << " " << row_numbers.size() << ": ";
    for(set<int>::iterator iter = row_numbers.begin(); iter != row_numbers.end(); iter++)
    {
        cout << *iter;
        if((++iter) != row_numbers.end())
        {
            cout << ", ";
        }
        else {
            cout << endl;
        }
        iter--;
    }
}

void print_out_data(DATA_STRUCT const &rows_data) {
    for(DATA_STRUCT::const_iterator iter = rows_data.begin(); iter != rows_data.end(); iter++)
    {
        convert_to_output_line(iter);
    }
}
