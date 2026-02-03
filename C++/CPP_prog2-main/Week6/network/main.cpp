#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <map>
#include <unordered_map>

using OrganizationTree = std::map<std::string, std::vector<std::string>>;

const std::string HELP_TEXT = "S = store id1 i2\nP = print id\n"
                              "C = count id\nD = depth id\n";


std::vector<std::string> split(const std::string& s,
                               const char delimiter,
                               bool ignore_empty = false)
{
    std::vector<std::string> result;
    std::string tmp = s;

    while(tmp.find(delimiter) != std::string::npos)
    {
        std::string new_part = tmp.substr(0, tmp.find(delimiter));
        tmp = tmp.substr(tmp.find(delimiter) + 1, tmp.size());
        if(not (ignore_empty and new_part.empty()))
        {
            result.push_back(new_part);
        }
    }
    if(not (ignore_empty and tmp.empty()))
    {
        result.push_back(tmp);
    }
    return result;
}
void storing(OrganizationTree& network,
             const std::string& boss_id,
             const std::string& underling_id)
{
    if(network.find(boss_id) == network.end())
    {
        network[boss_id] = {};
    }
    network.at(boss_id).push_back(underling_id);
    network[underling_id] = {};
}
void printing(const OrganizationTree& network,
              const std::string& boss_id,
              unsigned current_depth = 0)
{
    std::cout << std::string(current_depth * 2, '.') << boss_id << "\n";
    for(const auto& underlings : network.at(boss_id))
    {
        printing(network, underlings, current_depth + 1);
    }
}
unsigned counting(const OrganizationTree& network,
            const std::string& boss_id)
{
    const auto& underlings = network.at(boss_id);
    unsigned underlings_count = underlings.size();

    for(const auto& underling : underlings)
    {
        underlings_count += counting(network, underling);
    }
    return underlings_count;
}
unsigned depths(const OrganizationTree& network,
                const std::string& boss_id)
{
   unsigned max_depth_sub = 0;
    for (const auto& underlings : network.at(boss_id))
    {
        auto depth = depths(network, underlings);
        if(depth > max_depth_sub)
        {
            max_depth_sub = depth;
        }
    }

    return 1 + max_depth_sub;
}

int main()
{
    // TODO: Implement the datastructure here
    OrganizationTree network;
    std::map<std::string, std::vector<std::string>>::iterator iter;
    std::vector<std::string> single;

    while(true)
    {
        std::string line;
        std::cout << "> ";
        getline(std::cin, line);
        std::vector<std::string> parts = split(line, ' ', true);

        // Allowing empty inputs
        if(parts.size() == 0)
        {
            continue;
        }

        std::string command = parts.at(0);

        if(command == "S" or command == "s")
        {
            if(parts.size() != 3)
            {
                std::cout << "Erroneous parameters!" << std::endl << HELP_TEXT;
                continue;
            }
            std::string id1 = parts.at(1);
            std::string id2 = parts.at(2);

            // TODO: Implement the command here!

            storing(network, id1, id2);

        }
        else if(command == "P" or command == "p")
        {

            if(parts.size() != 2)
            {
                std::cout << "Erroneous parameters!" << std::endl << HELP_TEXT;
                continue;
            }
            std::string id = parts.at(1);

            // TODO: Implement the command here!

            printing(network, id);
        }
        else if(command == "C" or command == "c")
        {
            if(parts.size() != 2)
            {
                std::cout << "Erroneous parameters!" << std::endl << HELP_TEXT;
                continue;
            }
            std::string id = parts.at(1);

            // TODO: Implement the command here!
            std::cout << counting(network, id) << "\n";

        }
        else if(command == "D" or command == "d")
        {
            if(parts.size() != 2)
            {
                std::cout << "Erroneous parameters!" << std::endl << HELP_TEXT;
                continue;
            }
            std::string id = parts.at(1);

            // TODO: Implement the command here!
            std::cout << depths(network, id) << "\n";

        }
        else if(command == "Q" or command == "q")
        {
           return EXIT_SUCCESS;
        }
        else
        {
            std::cout << "Erroneous command!" << std::endl << HELP_TEXT;
        }
    }
}
