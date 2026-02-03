#ifndef PLAYER_HH
#define PLAYER_HH

#include "string"
#include "iostream"

using namespace std;

class Player
{
public:
    Player(string const& name);
    string get_name() const;
    int get_points();
    bool has_won();
    void add_points(int pts);
    Player* in_turn();
private:
    std::string name_;
    int pts_;
};

#endif // PLAYER_HH
