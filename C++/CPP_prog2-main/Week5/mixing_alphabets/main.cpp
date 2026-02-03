#include <iostream>
#include <string>
#include <algorithm>
#include <random>
#include <vector>

using namespace std;

int main()
{
    // This is a random number generator that should be given as parameter to the
    // function of the algorithm library to shuffle letters
    std::minstd_rand generator;

    std::cout << "Enter some text. Quit by entering the word \"END\"." << std::endl;
    std::string word;

    std::vector<string> words;
    std::vector<char> character;

    while (std::cin >> word)
    {
        if (word == "END")
        {
            return EXIT_SUCCESS;
        }
        // TODO: implement your solution here
        words.push_back(word);
        vector<string>::iterator ite = words.begin();
        vector<string>::iterator iter = words.end();

            *ite = words.at(0);
            ++ite;

            if(word.length() > 1){
            shuffle(word.begin()+1, word.end()-1, generator);
            }

            cout << word << std::endl;
    }
}
