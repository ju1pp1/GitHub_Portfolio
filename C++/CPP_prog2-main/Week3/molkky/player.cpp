#include "player.hh"

Player::Player(string const& name):
    name_(name), pts_()
{

}

string Player::get_name() const
{
return name_;
}

int Player::get_points()
{
return pts_;
}

bool Player::has_won()
{
    if(pts_ != 50){
        return false;
    }
    else if(pts_ == 50){
        return true;
    }
    return 0;
}

void Player::add_points(int pts)
{

  pts_ += pts;
  if(pts_ > 50){
      pts_ = 25;
  }
}

Player *Player::in_turn()
{
 return 0;
}


