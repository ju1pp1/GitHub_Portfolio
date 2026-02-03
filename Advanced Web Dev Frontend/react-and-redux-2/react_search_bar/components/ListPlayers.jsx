/** @format
 *
  Short instructions
  -----------------
  This component is used to display a list of  ayers. It receives getPlayer and players as props.

  For ids, classes and html elements, refer to tests in the __tests__ folder to pass the unit tests, and  the cypress/e2e folder for the end-to-end tests.

  BEWARE: some tests do not pass if you do not handle the case where the players prop is an empty array, or null.

  A proposed approach (again, feel free to go your own way)
  --------------------
  Step 1: Update Component Props
    Modify the component to accept two props:
      players: An array of player objects to be displayed.
      getPlayer: A function to handle clicks on individual players.

Step 2: Add a Fallback for Invalid Players Data 
  Inside the component:
    Check if players is null or not an array.
    If invalid, assign it an empty array to ensure the component renders without errors.

Step 3: Render a List Header
  Add an <h2> element at the top of the component to display a title.
Step 4: Render a List of Players
    Use a <ul> element with an id attribute set to "players-list".
    Iterate over the players array and for each player object:
        Render a <ListPlayer> component.
        Pass the following props to ListPlayer:
            key: Set it to the unique id of the player.
            player: Pass the current player object.
            onClick: Pass the getPlayer function.
 */

import { ListPlayer } from "./ListPlayer.jsx";
import { SearchBox } from "./SearchBox.jsx";
import React, {useState} from "react"
// Update Component Props
export const ListPlayers = ({ players, getPlayer }) => {

  const [searchTerm, setSearchTerm] = useState("");
  // Add a Fallback for Invalid Players Data
  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()));
  // Render a List Header
  return (
  <div>
    <h2 id="players-list-header">List of players</h2>
    <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />
    <ul id="players-list">
      {filteredPlayers.length > 0 ? (
        filteredPlayers.map((player) => (
          <ListPlayer
            key={player.id}
            player={player}
            onClick={getPlayer}
          />
        ))
      ) : null}
    </ul>
  </div>
  );
};
