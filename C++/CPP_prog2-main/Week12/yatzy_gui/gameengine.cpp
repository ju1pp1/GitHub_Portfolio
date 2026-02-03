/* Yatzy GUI projekti
 *
 * Kuvaus:
 *   Ohjelma toteuttaa yatzy-pelin. Pelissä on mahdollista valita pelaajamäärä
 *   spinboxin avulla. Kun pelaajamäärä on asetettu, klikataan confirm (vahvistus)
 *   painiketta. Tämän jälkeen peli lähtee käyntiin. Kullakin pelaajalla on 3
 *   mahdollisuutta heittää noppia uudestaan. Pelissä voi lukita tietyn numeron
 *   kohdalta, jos ei halua sen vaihtuvan. Jos haluaa pitää kaikki, sitten lukitaan
 *   tietysti kaikki numerot. Peli päättyy kun kaikki ovat käyttäneet noppien
 *   heittomäärät ja voittaja julkaistaan. Peli on mahdollista myös aloittaa
 *   uudestaan reset painikkeella.
 *
 * Ohjelman kirjoittaja
 * Nimi: Jeremi Andersin
 * Opiskelijanumero: 151965638
 * Käyttäjätunnus: sdjean ( Git-repositorion hakemistonimi. )
 * E-Mail: jeremi.andersin@tuni.fi
 *
 * Huomioita ohjelmasta ja sen toteutuksesta (jos sellaisia on):
 *  Käytetään pohjakoodina functions ja gameengine -luokkia. Gameengine luokkaan
 *  on tehty muutoksia.
 * */

#include "gameengine.hh"
#include "functions.hh"
#include <iostream>
#include <sstream>

GameEngine::GameEngine():
    game_turn_(0), game_over_(false), diceLocks_(NUMBER_OF_DICES, false)
{
}

GameEngine::~GameEngine()
{
}

void GameEngine::add_player(const Player player)
{
    players_.push_back(player);
}

void GameEngine::update_guide(std::ostringstream& outputstream) const
{
    if(players_.empty())
    {
        outputstream << "No players available.";
        return;
    }
    if(players_.size() <= game_turn_)
    {
        std::cout << "Internal error: update_guide" << std::endl;
        return;
    }
    //ostringstream outputstream{""};
    outputstream << "Player " << game_turn_ + 1 << " in turn, "
                 << players_.at(game_turn_).rolls_left_ << " trials left!";
    std::cout << outputstream.str() << std::endl;
}

const std::vector<int>& GameEngine::get_latest_dice_values() const
{
    return latest_dice_values_;
}

unsigned int GameEngine::getCurrentPlayerId() const
{
    if(game_turn_ < players_.size())
    {
        return players_[game_turn_].id_;
    }
    return 0;
}

void GameEngine::setDiceLockState(int index, bool state)
{
    if(index >= 0 && index < NUMBER_OF_DICES)
    {
        diceLocks_[index] = state;
    }
}

const std::vector<Player> &GameEngine::getPlayers() const
{
    return players_;
}
void GameEngine::reset_game()
{
    game_over_ = false;
    game_turn_ = 0;

}

void GameEngine::reset_latest_dice_values()
{
    if(game_turn_ < players_.size())
    {
        latest_dice_values_.clear();
        latest_dice_values_.resize(NUMBER_OF_DICES, 0);
    }
}
void GameEngine::roll()
{
    if(players_.size() <= game_turn_)
    {
        std::cout << "Internal error: roll" << std::endl;
        return;
    }

    if(players_.at(game_turn_).rolls_left_ == 0)
    {
        std::cout << "No more rolls left" << std::endl;
        return;
    }

    ostringstream outputstream{""};
    vector<int> new_points;
    unsigned int dice = 0;


    while ( dice < NUMBER_OF_DICES )
    {
        if(!diceLocks_[dice])
        {
            int point_value = roll_dice();
            std::cout << point_value << " ";
            new_points.push_back(point_value);

        }
        else
        {
            new_points.push_back(latest_dice_values_[dice]);
        }
        ++dice;
    }

    latest_dice_values_ = new_points;

    update_points(new_points);
    report_player_status();

    // Decreasing rolls left
    --players_.at(game_turn_).rolls_left_;

    // Checking if the player in turn has rolls left
    if ( players_.at(game_turn_).rolls_left_ == 0 )
    {
        outputstream << "Turn of " << players_.at(game_turn_).id_
                     << " has ended!";
        std::cout << outputstream.str() << std::endl;
    }

    // Checking if any player has turns left
    if ( all_turns_used() )
    {
        report_winner();
    }
}

int GameEngine::getCurrentPlayerRollsLeft() const
{
    /*
    if(game_turn_ < rolls_left_.size())
    {
        return rolls_left_[game_turn_];
    }
     */

    if(game_turn_ < players_.size())
    {
        return players_[game_turn_].rolls_left_;
    }
    return 0;
}

void GameEngine::give_turn()
{
    // Searching for the next player among those, whose id_ is greater than
    // that of the current player
    for ( unsigned int i = game_turn_ + 1; i < players_.size(); ++i )
    {
        if ( players_.at(i).rolls_left_ > 0 )
        {
            game_turn_ = i;
            return;
        }
    }

    // A suitable next player couldn't be found in the previous search, so
    // searching for the next player among those, whose id_ is less than
    // or equal to that of the current player
    // (perhaps the current player is the only one having turns left)
    for(unsigned int i = 0; i <= game_turn_; ++i)
    {
        if(players_.at(i).rolls_left_ > 0)
        {
            game_turn_ = i;
            return;
        }
    }

    // No player has turns left
    report_winner();
}

std::string GameEngine::get_winner_info() const
{
    vector<vector<int>> all_point_values;
    for (auto player : players_)
    {
        all_point_values.push_back(player.best_point_values_);
    }
    return decide_winner(all_point_values);
}

void GameEngine::report_winner()
{
    vector<vector<int>> all_point_values;
    for ( auto player : players_ )
    {
        all_point_values.push_back(player.best_point_values_);
    }
    string winner_text = decide_winner(all_point_values);
    std::cout << winner_text << std::endl;
    game_over_ = true;
}

bool GameEngine::is_game_over() const
{
    return game_over_;
}

void GameEngine::report_player_status() const
{
    if ( players_.size() <= game_turn_ )
    {
        std::cout << "Internal error: report_player_status" << std::endl;
        return;
    }
    string textual_description = "";
    construe_result(players_.at(game_turn_).latest_point_values_,
                    textual_description);
    std::cout << textual_description << std::endl;
}

void GameEngine::update_points(const std::vector<int>& new_points)
{
    if ( players_.size() <= game_turn_ )
    {
        std::cout << "Internal error: update_points" << std::endl;
        return;
    }
    string dummy = "";
    int new_result = construe_result(new_points, dummy);
    int best_result_so_far
            = construe_result(players_.at(game_turn_).best_point_values_,
                              dummy);
    if ( new_result > best_result_so_far )
    {
        players_.at(game_turn_).best_point_values_ = new_points;
    }
    players_.at(game_turn_).latest_point_values_ = new_points;
}

bool GameEngine::all_turns_used() const
{
    for ( auto player : players_ )
    {
        if ( player.rolls_left_ > 0 )
        {
            return false;
        }
    }
    return true;
}

void GameEngine::clear_players()
{
    players_.clear();
}

