import { ListPlayer } from "./ListPlayer.jsx";
import { useSelector } from "react-redux";
import React from "react"
import { SearchBar } from "./SearchBar.jsx"

export const ListPlayers = ({ selectPlayer }) => {
  const players = useSelector((state) => state.players);
  const searchQuery = useSelector((state) => state.searchQuery);

  // Add a Fallback for Invalid Players Data
  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchQuery.toLowerCase()));
  // Render a List Header
  return (
  <div>
    <h2 id="players-list-header">List of players</h2>
    <SearchBar />
    <ul id="players-list" role="list">
      {filteredPlayers.length > 0 ? (
        filteredPlayers.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
            onClick={selectPlayer}
          />
        ))
      ) : null}
    </ul>
  </div>
  );
};
