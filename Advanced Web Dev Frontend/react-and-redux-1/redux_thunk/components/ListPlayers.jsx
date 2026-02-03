/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */
/*
export const ListPlayers = () => {
	return (
		<div>
			<h2>List of players</h2>
			TODO: ListPlayers
		</div>
	);
};*/

import { ListPlayer } from "./ListPlayer.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/ListPlayer.js";
// Update Component Props
export const ListPlayers = () => {
  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const handlePlayerClick = (id) => {
	dispatch(getSelectedPlayer(id));
  };
	return (
  <div>
    <h2 id="players-list-header">List of players</h2>
    <ul id="players-list">
      {players.length > 0 ? (
        players.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
            onClick={handlePlayerClick}
          />
        ))
      ) : (
        <li id="no-players">No players available</li>
      )}
    </ul>
  </div>
  );
};
