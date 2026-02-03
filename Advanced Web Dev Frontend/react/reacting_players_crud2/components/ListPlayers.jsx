/** @format
 *
 * Short instructions
 * ------------------
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import { ListPlayer } from "./ListPlayer.jsx";
// Update Component Props
export const ListPlayers = ({ players, getPlayer }) => {
  // Add a Fallback for Invalid Players Data
  const validPlayers = Array.isArray(players) ? players : [];
  // Render a List Header
  return (
  <div>
    <h2 id="players-list-header">List of players</h2>
    <ul id="players-list">
      {validPlayers.length > 0 ? (
        validPlayers.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
            onClick={getPlayer}
          />
        ))
        //TESTING
      ) : (
        <li id="no-players">No players available</li>
      )}
    </ul>
  </div>
  );
};