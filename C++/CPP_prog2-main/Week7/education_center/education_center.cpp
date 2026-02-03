#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <fstream>
#include <sstream>
#include <set>
#include <algorithm>

const char CSV_FIELD_DELIMITER = ';';
const int COURSE_FULL = 50;

struct Course {
    std::string name;
    std::string theme;
    int enrollments;
};

/* Kansalaisopisto
 *
 * Kuvaus:
 * Ohjelma toteuttaa tiedoston lukemisen, josta muodostuu Kurssikeskuksen kursseista koostuva rakenne/hierarkia.
 * Tarkoitus on aloittaa lukemalla tekstitiedosto ikään kuin CSV-tiedostoa luettaisiin. Tiedostossa on
 * erilaista dataa riveittäin, jotka on jaoteltu puolipisteellä (;). Jokainen rivi pilkotaan tämän puolipisteen
 * perusteella.
 *
 * Ohjelma alkaa syöttämällä tiedostonimi. Esimerkiksi testifile.txt tai testifile.
 * Tiedoston luku tapahtuu read_input_file funktion avulla. Palautetaan virheviesti mikäli ei tiedostoa löydy.
 *
 * Tiedoston lukemisen jälkeen komentoriville tulee merkki "> ". Tämän merkin jälkeen on tarkoitus
 * syöttää erilaisia komentoja tietojen tulostamiseen.
 *
 *
 * Komennot listattuna:
 *      quit                                - Lopettaa ohjelman.
 *      locations                           - Tuo tunnetut paikkakunnat aakkosjärjestyksessä.
 *      themes_in_location <paikkakunta>    - Allekkain kaikki annetun paikkakunnan teemat aakkosjärjestyksessä.
 *      courses <paikkakunta> <teema>       - Kurssin nimen mukaisessa aakkosjärjestyksessä kaikki kyseisen paikkakunnan
 *                                            kurssit, jotka löytyvät siltä paikkakunnalta ja kyseisestä teemasta
 *                                            sekä osallistujamäärät.
 *      available                           - Kertoo paikkakuntien kaikista kursseista ne, joille voi vielä
 *                                            ilmoittautua.
 *      courses_in_theme <teema>            - Tulostaa kaikilta paikkakunnilta annettuun teemaan kuuluvat kurssit.
 *      favorite_theme                      - Suosituin teema. Osanottajat lasketaan kursseista yhteen ja
 *                                            tulostetaan niistä suurin sekä teema.
 *
 * Ohjelmassa on käytetty struct-rakennetta tietojen tallentamiseen.
 * Struct:n nimi on Course, joka pitää sisällään:
 *      - string name (kurssin nimi)
 *      - string theme (teeman nimi)
 *      - int enrollments (osallistujamäärä)
 *
 * Virheiden hallinta:
 *
 * Käyttäjän syöttäessä tuntematon komento tulostetaan virheilmoitus
 * Error: unknown command
 *
 * Mikäli komennolle annetaan väärä määrä parametreja, tulostetaan virheilmoitus
 * esim. courses komentoa käyttäessä
 * Error: error in command courses
 *
 * Jos komennolle themes_in_location annetaan paikkakunta, jota ei löydy, tulostetaan
 * Error: unknown location
 *
 * Komennolle courses_in_theme on mahdollist antaa teema, jota ei löydy. Tällöin tulostuu
 * Error: unknown theme
 *
 * courses-komentoon liittyy kaksi erillistä virheilmoitusta.
 * Mikäli paikkakuntaa ei löydetä tulostetaan:
 * Error: unknown location name
 * Mikäli teemaa ei löydetä tulostetaan:
 * Error: unknown theme
 *
 *
 * Ohjelman kirjoittaja
 * Nimi: Jeremi Andersin
 * Opiskelijanumero: 151965638
 * Käyttäjätunnus: sdjean
 * E-Mail: jeremi.andersin@tuni.fi
 *
 * Huomioita ohjelmasta ja sen toteutuksesta:
 *
 * */

using namespace std;

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
    if(result.back() == "") {
        result.erase(--result.end());
    }
    return result;
}

//Luetaan tiedosto
bool read_input_file(
        const string& filepath,
        vector<string>& lines)
{
    std::ifstream input_file_in(filepath);
    if(!input_file_in.is_open())
    {
        return false;
    }
    string line;
    while(getline(input_file_in, line))
    {
        lines.push_back(line);
    }
    return true;
}

//Tarkistetaan kenttien määrä.
bool validate_field_count(const vector<string>& fields)
{
    if(fields.size() != 4)
    {
        return false;
    }
    return true;
}

//Tarkistetaan onko tyhjiä kenttiä.
bool validate_no_empty_fields(const vector<string>& fields)
{
    for(const auto& field : fields)
    {
        if(field.empty())
        {
            return false;
        }
    }
    return true;
}

//Parsitaan rivit ja data, jotka sitten asetetaan säiliöön.
bool parse_input_lines(
        const vector<string>& lines,
        map<string, vector<Course>>& courses_by_location)
{
    //Vakioarvoa ';' käytetään paloitteluun tiedoston lukemisessa.
    for(const string& line : lines)
    {
        vector<string> fields = split(line, CSV_FIELD_DELIMITER);

        if(!validate_field_count(fields)
                || !validate_no_empty_fields(fields))
        {
            return false;
        }

        const string& location = fields.at(0);
        const string& theme = fields.at(1);
        const string& name = fields.at(2);
        int enrollments = 0;

        if(fields.at(3) == "full")
        {
            enrollments = COURSE_FULL;
        }
        else
        {
            istringstream enrollments_in(fields.at(3));
            if(!(enrollments_in >> enrollments))
            {
                return false;
            }
        }
        //Course new_course = Course{theme, name, enrollments};
        Course new_course{name, theme, enrollments};

        //Toteutetaan kurssien yms. lisäämiset
        courses_by_location.try_emplace({});

        vector<Course>& courses_under_location = courses_by_location[location];
        auto it = courses_under_location.begin();

        for( ; it != courses_under_location.end(); ++it)
        {
            if(it->theme == new_course.theme
               && it->name == new_course.name)
            {
                break;
            }
        }
        if(it != courses_under_location.end())
        {
            courses_under_location.erase(it);
        }
            courses_under_location.push_back(new_course);

    }

    return true;
}

//Funktio locations -komennolle.
void print_locations(const map<string, vector<Course>>& courses_by_location)
{
    set<string> locations;
    for(const auto& pair : courses_by_location)
    {
        locations.insert(pair.first);
    }

    for(auto it = locations.begin(); it != locations.end(); ++it)
    {
        if(it != locations.begin())
        {
            cout << *it << "\n";
        }
        else
        {
            cout << *it;
        }
    }
}

//Funktio themes_in_location <location> -komennolle.
void print_themes_in_location(const map<string, vector<Course>>& courses_by_location, const string& location)
{
    auto it = courses_by_location.find(location);
    if(it != courses_by_location.end())
    {
        set<string> themes;
        for(const auto& course : it->second)
        {
            themes.insert(course.theme);
        }

        for(const auto& theme : themes)
        {
            cout << theme << "\n";
        }
    }
    else
    {
        cout << "Error: unknown location\n";
    }
}

//funktio courses <location> <theme> komennolle.
void print_courses_in_location_and_theme(const map<string, vector<Course>>& courses_by_location, const string& location, const string& theme)
{
    auto it = courses_by_location.find(location);
    if( it != courses_by_location.end())
    {
        const vector<Course>& courses_in_location = it->second;
        vector<Course> courses_in_location_and_theme;

        //Filtteröidään kurssit teeman mukaan
        copy_if(courses_in_location.begin(), courses_in_location.end(), back_inserter(courses_in_location_and_theme),
                [&theme](const Course& course) {
            return course.theme == theme;
        });
        //Aakkosjärjestys
        sort(courses_in_location_and_theme.begin(), courses_in_location_and_theme.end(),
             [](const Course& a, const Course& b) {
            return a.name < b.name;
        });

        if(courses_in_location_and_theme.empty())
        {
            cout << "Error: unknown theme" << endl;
        }
        else
        {
            for(const auto& course : courses_in_location_and_theme)
            {
                if(course.enrollments == COURSE_FULL)
                {
                    cout << course.name << " --- full" << "\n";
                }
                else {
                    cout << course.name <<" --- " << course.enrollments << " enrollments" << "\n";
                }
            }
        }
    }
    else {
        cout << "Error: unknown location name\n";
    }
}

//Funktio available -komennolle, joka tulostaa vapaat kurssit (Eivät ole täynnä).
void print_available_courses(const map<string, vector<Course>>& courses_by_location)
{
    vector<string> available_courses;

    //Iteroi kurssit
    for(const auto& pair : courses_by_location)
    {
        const string& location = pair.first;
        const vector<Course>& courses_in_location = pair.second;

        for(const auto& course : courses_in_location)
        {
            if(course.enrollments < COURSE_FULL)
            {
                string course_info = location + " : " + course.theme + " : " + course.name;
                available_courses.push_back(course_info);
            }
        }
    }
    //Järjestetään tiedot
    sort(available_courses.begin(), available_courses.end());
    for(const auto& course : available_courses)
    {
        cout << course << "\n";
    }
}

//Funktio komennolle courses_in_theme.
void print_courses_in_theme(const map<string, vector<Course>>& courses_by_location, const string& theme)
{
    bool theme_found = false;
    set<string> unique_courses;

    //Iteroidaan sijainnit ja niiden kurssit
    for(const auto& pair : courses_by_location)
    {
        const vector<Course>& courses_in_location = pair.second;

        for(const auto& course : courses_in_location)
        {
            if(course.theme == theme)
            {
                theme_found = true;
                unique_courses.insert(course.name);
            }
        }
    }
    if(!theme_found)
    {
        cout << "Error: unknown theme" << endl;
    }
    for(const auto& course : unique_courses)
    {
        cout << course << "\n";
    }
}

void print_favorite_theme(const map<string, vector<Course>>& courses_by_location)
{
    bool has_enrollments = false;
    for(const auto& pair : courses_by_location)
    {
        if(!pair.second.empty())
        {
            has_enrollments = true;
            break;
        }
    }
    if(!has_enrollments)
    {
        cout << "No enrollments" << endl;
        return;
    }

    map<string, int> enrollments_by_theme;

    for(const auto& pair : courses_by_location)
    {
        const vector<Course>& courses_in_location = pair.second;

        for(const auto& course : courses_in_location)
        {
            //Lisätään enrollmentit tietyn teeman alle
            enrollments_by_theme[course.theme] += course.enrollments;
        }
    }

    int max_enrollments = 0;
    for(const auto& pair : enrollments_by_theme)
    {
        max_enrollments = max(max_enrollments, pair.second);
    }

    cout << max_enrollments << " enrollments in themes" << endl;
    bool found_favorite = false;
    for(const auto& pair : enrollments_by_theme)
    {
        if(pair.second == max_enrollments)
        {
            if(found_favorite)
            {
                cout << "\n";
            }
            cout << "--- " << pair.first;
            found_favorite = true;
        }
    }

    cout << endl;

}

int main()
{
    string input_filepath;
    cout << "Input file: ";
    getline(cin, input_filepath);

    vector<string> input_file_lines;
    if(!read_input_file(input_filepath, input_file_lines))
{
    cerr << "Error: the input file cannot be opened\n";
    return EXIT_FAILURE;
}

    map<string, vector<Course>> courses_by_location;
    if(!parse_input_lines(input_file_lines, courses_by_location))
    {
        cerr << "Error: empty field\n";
        return EXIT_FAILURE;
    }

    string command;
    while(true)
    {
        cout << "> ";
        getline(cin, command);

        stringstream ss(command);
        string token;
        ss >> token;

        //Komennot alkaa tästä
        if(token == "quit")
        {
            return EXIT_SUCCESS;
        }

        else if(token == "locations")
        {
            //Implementing error handling
            if(ss.rdbuf()->in_avail() != 0)
            {
                cout << "Error: error in command locations\n";
                continue;
            }

            print_locations(courses_by_location);
        }
        else if(token == "themes_in_location")
        {
            string location;
            ss >> location;

            if(ss.rdbuf()->in_avail() != 0)
            {
                cout << "Error: error in command themes_in_location\n";
                continue;
            }
            if(location.empty())
            {
                cout << "Error: error in command themes_in_location\n";
                continue;
            }

            print_themes_in_location(courses_by_location, location);
        }
        else if(token == "courses")
        {
            string location, theme;
            ss >> location;
            getline(ss, theme);
            theme.erase(0, theme.find_first_not_of(" \""));
            theme.erase(theme.find_last_not_of(" \"") + 1);


            if(location.empty() || theme.empty())
            {
                cout << "Error: error in command courses\n";
                continue;
            }
            if(ss.rdbuf()->in_avail() != 0)
            {
                cout << "Error: error in command courses\n";
                continue;
            }

            print_courses_in_location_and_theme(courses_by_location, location, theme);
        }
        else if(token == "available")
        {

            if(ss.rdbuf()->in_avail() != 0)
            {
                cout << "Error: error in command available\n";
                continue;
            }

            print_available_courses(courses_by_location);
        }
        else if(token == "courses_in_theme")
        {
            string theme;
            ss >> theme;

            if(ss.rdbuf()->in_avail() != 0)
            {
                cout << "Error: error in command courses_in_theme\n";
                continue;
            }
            if(theme.empty())
            {
                cout << "Error: error in command courses_in_theme\n";
                continue;
            }

            print_courses_in_theme(courses_by_location, theme);
        }
        else if(token == "favorite_theme")
        {
            if(ss.rdbuf()->in_avail() != 0)
            {
                cout << "Error: error in command favorite_theme\n";
                continue;
            }
            print_favorite_theme(courses_by_location);
        }
        else
        {
            cout << "Error: Unknown command: " << token << endl;
        }
    }


    return EXIT_SUCCESS;
}
