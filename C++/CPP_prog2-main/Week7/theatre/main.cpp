/* Teatteri
 *
 * Kuvaus:
 *   1. Luetaan tiedosto, josta käyttäen split funktiota luetaan STL-säiliöihin tietoja.
 *   Map-säiliöiden sisällä voi olla map-säiliöitä.
 *   2. Komennot
 *
 * Ohjelman kirjoittaja
 * Nimi: Jeremi Andersin
 * Opiskelijanumero: 151965638
 * Käyttäjätunnus: sdjean ( Git-repositorion hakemistonimi. )
 * E-Mail: jeremi.andersin@tuni.fi
 *
 * Huomioita ohjelmasta ja sen toteutuksesta (jos sellaisia on):
 *
 * */

#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <set>
#include <fstream>
#include <sstream>
#include <algorithm>
#include <regex>
#include <cstring>

int THEATRE_FULL = 0;
int LINE_NUMBER = 0;

struct Theatre
{
    std::string theatre_name;
    std::string show_name;
    std::string actor_name;
    int free_seats;
};

using namespace std;

// Fields in the input file
const int NUMBER_OF_FIELDS = 5;

// Command prompt
const string PROMPT = "the> ";

// Error and other messages
const string EMPTY_FIELD = "Error: empty field in line ";
const string FILE_ERROR = "Error: input file cannot be opened";
const string WRONG_PARAMETERS = "Error: wrong number of parameters";
const string THEATRE_NOT_FOUND = "Error: unknown theatre";
const string PLAY_NOT_FOUND = "Error: unknown play";
const string PLAYER_NOT_FOUND = "Error: unknown player";
const string TOWN_NOT_FOUND = "Error: unknown town";
const string COMMAND_NOT_FOUND = "Error: unknown command";
const string NOT_AVAILABLE = "No plays available";

// Casual split function, if delim char is between "'s, ignores it.
vector<string> split(const string& str, char delim)
{
    vector<string> result = {""};
    bool inside_quotation = false;
    for(char current_char : str)
    {
        if(current_char == '"')
        {
            inside_quotation = not inside_quotation;
        }
        else if(current_char == delim and not inside_quotation)
        {
            result.push_back("");
        }
        else
        {
            result.back().push_back(current_char);
        }
    }
    return result;
}
bool read_input_file(const string& filepath,
                     vector<string>& lines)
{
    ifstream input_file_in(filepath);
    if(!input_file_in.is_open())
    {
        return false;
    }
    string line;
    while(getline(input_file_in, line)){
        lines.push_back(line);

    }

    return true;
}
bool validate_field_count(const vector<string>& fields)
{
    if(fields.size() != 5)
    {
        return false;
    }
    return true;
}
bool validate_no_empty_fields(const vector<string>& fields)
{
    for (const auto& field : fields)
    {
        if(field.empty())
        {
            return false;
        }
    }
    return true;
}
bool parse_input_lines(const vector<string>& lines,
                       map<string, vector<Theatre>>& theatres_by_location)
{
    for (const string& line : lines)
    {
        vector<string> fields = split(line, ';');
        LINE_NUMBER++;
        if(!validate_field_count(fields)
                || !validate_no_empty_fields(fields))
        {
            //cout << line << "\n";
            return false;
        }

        const string& location = fields.at(0);
        const string& theatre_name = fields.at(1);
        const string& show_name = fields.at(2);
        const string& actor_name = fields.at(3);
        int free_seats = 0;

        if(fields.at(4) == "none")
        {
            free_seats = THEATRE_FULL;
        }
        else
        {
            istringstream seats_in(fields.at(4));
            if(!(seats_in >> free_seats))
            {
                return false;
            }
        }

        Theatre new_theatre{theatre_name, show_name, actor_name, free_seats};
        theatres_by_location.try_emplace({});

        vector<Theatre>& theatre_under_location = theatres_by_location[location];
        auto it = theatre_under_location.begin();

        for( ; it != theatre_under_location.end(); ++it)
        {
            if(it->theatre_name == new_theatre.theatre_name
                    && it->show_name == new_theatre.show_name
                    && it->actor_name == new_theatre.actor_name)
            {
                break;
            }
        }
        if( it != theatre_under_location.end())
        {
            theatre_under_location.erase(it);
        }
            theatre_under_location.push_back(new_theatre);
            //cout << "Theatre location: " << location << "\n";
            //cout << "Theatre name: " << theatre_name << "\n";
            //cout << "Show name: " << show_name << "\n";
            //cout << "Seats: " << free_seats << "\n\n";
    }
    return true;
}
bool compareFunction (string a, string b) {return a<b;}
void findTheatresOfPlay(const string& playName, const map<string, vector<Theatre>>& theatres_by_location) {
    bool playFound = false;
    std::set<std::pair<std::string, std::string>> printed_theatres;
    for (const auto& locationTheatres : theatres_by_location) {
        const vector<Theatre>& theatreList = locationTheatres.second;

        for (const Theatre& theatre : theatreList) {
            // Check if the play name is found in either show_name or after "/"
            if (theatre.show_name == playName ||
                theatre.show_name.find(playName) != string::npos ||
                theatre.show_name.substr(0, theatre.show_name.find("/")) == playName ||
                theatre.show_name.substr(theatre.show_name.find("/") + 1) == playName) {

                std::pair<std::string, std::string> theater_location_pair = std::make_pair(theatre.theatre_name, locationTheatres.first);
                if(printed_theatres.find(theater_location_pair) == printed_theatres.end())
                {
                    playFound = true;
                    cout << theatre.theatre_name << endl; //<< " at Location: " << locationTheatres.first
                    printed_theatres.insert(theater_location_pair);
                }
        }
      }
    }

    if (!playFound) {
        cout << PLAY_NOT_FOUND << endl;
    }
}
int count_parameters(const string& command_line) {
    vector<string> parts = split(command_line, ' ');
    return parts.size() - 1; // Subtract 1 to exclude the command itself
}

// Main function
int main()
{
    string input_filepath;
    ifstream filename;
    cout << "Input file: ";
    getline(cin, input_filepath);

    vector<string> input_file_lines;

    if (!read_input_file(input_filepath, input_file_lines))
    {
         cout << FILE_ERROR << endl;
         return EXIT_FAILURE;
    }

    map<string, vector<Theatre>> theatres_by_location;

    if(!parse_input_lines(input_file_lines, theatres_by_location))
    {

        cout << EMPTY_FIELD << LINE_NUMBER << endl;
        return EXIT_FAILURE;
    }

    //Don't stop program after giving a command.
    set<pair<string, string>> printed_theatres;
    while (true) {

    string command_line;
    cout << "the> ";
    getline(cin, command_line);

    map<string, vector<Theatre>>::iterator iter;
    iter = theatres_by_location.begin();
    vector<string> theatre_line;
    vector<string> show_line;

    //Implementing theatres-command
    if(command_line == "theatres")
    {
        for(const auto& alltheatres : theatres_by_location)
        {
            vector<Theatre> theatre_by_name = alltheatres.second;

            vector<string>::iterator iteri;

             for(const auto& tester : theatre_by_name)
            {
                //Remove duplicates
                 iteri = find(theatre_line.begin(), theatre_line.end(), tester.theatre_name);
                if(iteri == theatre_line.end())
                {
                    theatre_line.push_back(tester.theatre_name);
                }
            }
        }
        //Alphabetical order
        sort(theatre_line.begin(), theatre_line.end(), compareFunction);
        for(auto& tiedot : theatre_line)
        {
            cout << tiedot << "\n";
        }
    }

    //Implementing plays-command
    else if(command_line == "plays")
    {
        for(const auto& alltheatres : theatres_by_location)
        {
            vector<Theatre> theatre_by_name = alltheatres.second;
            vector<string>::iterator iteri;
            for(const auto& theatres_by_name : theatre_by_name)
            {
                //Remove duplicates
                iteri = find(show_line.begin(), show_line.end(), theatres_by_name.show_name);
               if(iteri == show_line.end())
               {
                   show_line.push_back(theatres_by_name.show_name);
               }
            }
        }
        for(auto& tiedot2 : show_line)
        {
            //Alphabetical order and replacing "/" with " *** "
            //if it was found in a string.

            if(find(show_line.begin(), show_line.end(), "/") == show_line.end())
            {
                sort(show_line.begin(), show_line.end(), compareFunction);
                regex_replace(tiedot2, regex("/"), " *** ");
                cout << regex_replace(tiedot2, regex("/"), " *** ") << "\n";
            }
        }
    }
    else if(command_line.find("theatres_of_play") != string::npos)
    {
        size_t pos = command_line.find("theatres_of_play");
            pos += strlen("theatres_of_play");
            // Skip spaces after "theatres_of_play"
            while (pos < command_line.size() && isspace(command_line[pos])) {
                pos++;
            }

            string play_name;

            // Check if the play name starts with a quotation mark
            if (pos < command_line.size() && command_line[pos] == '"') {
                pos++;
                size_t end_pos = command_line.find('"', pos);
                if (end_pos != string::npos) {
                    play_name = command_line.substr(pos, end_pos - pos);
                }
            }
            // If not, then assume it's a single word without quotation marks
            else {
                size_t end_pos = command_line.find(' ', pos);
                if (end_pos != string::npos) {
                    play_name = command_line.substr(pos, end_pos - pos);
                } else {
                    play_name = command_line.substr(pos);
                }
            }
            findTheatresOfPlay(play_name,theatres_by_location);
        }
    if (count_parameters(command_line) != 1) {
                    cout << WRONG_PARAMETERS << endl;
                    continue;
                }
    else if(command_line.find("plays_in_theatre") != string::npos)
    {
        size_t pos = command_line.find("plays_in_theatre");
            pos += strlen("plays_in_theatre");

            // Skip spaces after "plays_in_theatre"
            while (pos < command_line.size() && isspace(command_line[pos])) {
                pos++;
            }

            string theatre_name;
            // Check if the theater name is enclosed in double quotation marks
                if (pos < command_line.size() && command_line[pos] == '"') {
                    pos++;
                    size_t end_pos = command_line.find('"', pos);
                    if (end_pos != string::npos) {
                        theatre_name = command_line.substr(pos, end_pos - pos);
                    }
                }
                // Now, search for the specified theater name and print associated plays
                        bool found = false;

                        for (const auto& locationTheatres : theatres_by_location) {
                            const vector<Theatre>& theatreList = locationTheatres.second;
                            set<string> uniquePlays;

                            for (const Theatre& theatre : theatreList) {
                                if (theatre.theatre_name == theatre_name) {
                                    found = true;
                                    //cout << "Plays at " << theatre_name << ":" << endl;

                                    // Print all plays associated with this theater
                                    for (const Theatre& play : theatreList) {
                                        if (play.theatre_name == theatre_name) {
                                            //cout << play.show_name << endl;
                                            uniquePlays.insert(play.show_name);
                                        }
                                    }
                                    for(const string& play : uniquePlays)
                                    {
                                        cout << play << endl;
                                    }
                                    break; // No need to continue searching
                                }
                            }

                            if (found) {
                                break;
                            }
                        }

                        if (!found) {
                            cout << THEATRE_NOT_FOUND << endl;
                        }
    }
    if (count_parameters(command_line) != 1) {
                    cout << WRONG_PARAMETERS << endl;
                    continue;
                }
    else if(command_line.find("plays_in_town") != string::npos)
    {
        size_t pos = command_line.find("plays_in_town");
            pos += strlen("plays_in_town");

            // Skip spaces after "plays_in_town"
            while (pos < command_line.size() && isspace(command_line[pos])) {
                pos++;
            }

            string town_name;

            // Check if the town name is enclosed in double quotation marks
            if (pos < command_line.size() && command_line[pos] == '"') {
                pos++;
                size_t end_pos = command_line.find('"', pos);
                if (end_pos != string::npos) {
                    town_name = command_line.substr(pos, end_pos - pos);
                }
            } else {
                size_t end_pos = command_line.find(' ', pos);
                if (end_pos != string::npos) {
                    town_name = command_line.substr(pos, end_pos - pos);
                } else {
                    town_name = command_line.substr(pos);
                }

                // Now, search for the specified town name and print associated theaters, plays, and free seats
                bool found = false;

                for (const auto& locationTheatres : theatres_by_location) {
                    const string& location = locationTheatres.first;
                    const vector<Theatre>& theatreList = locationTheatres.second;

                    if (location == town_name) {
                        for (const Theatre& theatre : theatreList) {
                            if (theatre.free_seats > 0) {
                                // Replace "/" with " --- " in play names
                                string play_name = theatre.show_name;
                                std::regex slash_regex("/");
                                play_name = std::regex_replace(play_name, slash_regex, " --- ");

                                cout << theatre.theatre_name << " : " << play_name << " : " << theatre.free_seats << endl;
                            }
                        }
                        found = true;
                    }
                }

                if (!found) {
                    cout << TOWN_NOT_FOUND << endl;
                }
            }
    }
    if (count_parameters(command_line) != 1) {
                    cout << WRONG_PARAMETERS << endl;
                    continue;
                }
    else if(command_line == "quit")
    {
       return EXIT_SUCCESS;
    }
    else {
        cout << COMMAND_NOT_FOUND << "\n";
    }
  }
}

