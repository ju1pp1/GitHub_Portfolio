#include <iostream>
#include <string>
#include <vector>


// TODO: Implement split function here
// Do not change main function
std::vector<std::string> split(std::string line, char separator)
{
    std::vector<std::string> vektori = {};
    //int katkaisija = line.find(separator); //etsi katkaisijan kohta (numero)
    int pituus = line.length();
    //rivinvaihto "\n\n"
    //std::cout << << std::endl;

    for(int i = 0; i < pituus; i++){
        if(line.at(i) == separator){
            //std::cout << i << std::endl;
            line.replace(i,1, "\n");
        }
    }

    vektori.push_back(line);
    return vektori;
}
std::vector<std::string> split(std::string line, char separator, bool trueorfalse)
{
    std::vector<std::string>vektori;
    int pituus = line.length();

    for(int i = 0; i < pituus; i++){
        if(line.at(i) == separator){
            if(line.at(i+1) == separator){
            trueorfalse = true;
            }
            else {
                trueorfalse = false;
            }


            line.replace(i,1, "\n");
            if(line.at(i+1) == separator && trueorfalse == true){
                //line.erase(i, 1);
                line.replace(i,1, " ");
                line.replace(i+1,1, "\n");

            }
            else {
                line.replace(i,1, "\n");
            }
        }
    }

    vektori.push_back(line);

    return vektori;
}

int main()
{
    std::string line = "";
    std::cout << "Enter a string: ";
    getline(std::cin, line);
    std::cout << "Enter the separator character: ";
    char separator = getchar();

    std::vector< std::string > parts  = split(line, separator);
    std::cout << "Splitted string including empty parts: " << std::endl;
    for( auto part : parts ) {
        std::cout << part << std::endl;
    }

    std::vector< std::string > parts_no_empty  = split(line, separator, true);
    std::cout << "Splitted string ignoring empty parts: " << std::endl;
    for( auto part : parts_no_empty ) {
        std::cout << part << std::endl;
    }
}
