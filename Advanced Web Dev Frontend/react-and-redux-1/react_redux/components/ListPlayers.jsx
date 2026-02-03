/** @format */

/** @format
 * @description
 * Student instructions:
 *
 * Copy paste your code from the ListPlayers.jsx file here from the react player fetch exercise
 * BEWARE: Only the selectPlayer function is passed as a prop from now on. The players data is fetched from the redux store.
 *
 */

/*
export const ListPlayers = ({ selectPlayer }) => {
  return (
    <div>
      <h2>List of players</h2>
      TODO: ListPlayers
    </div>
  );
};*/
import { ListPlayer } from "./ListPlayer.jsx";
import { useSelector } from "react-redux";
// Update Component Props
export const ListPlayers = ({ selectPlayer }) => {
  const players = useSelector((state) => state.players);

  // Add a Fallback for Invalid Players Data
  const validPlayers = Array.isArray(players) ? players : [];
  // Render a List Header
  return (
  <div>
    <h2 id="players-list-header">List of players</h2>
    <ul id="players-list" role="list">
      {validPlayers.length > 0 ? (
        validPlayers.map((player) => (
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
