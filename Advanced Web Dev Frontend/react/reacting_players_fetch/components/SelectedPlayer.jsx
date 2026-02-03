/** @format
 *
  Short instructions
  ------------------

  This component is used to display the selected player. It receives a player as props.
  
  NOTE: For the ids, classes and html elements, refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
 */
import React from 'react';

export const SelectedPlayer = ({player}) => {
  if(!player) {
    return null;
  }
  return (
    <div id="selected-player">
      <h2 id="player-name">{player.name}</h2>
      <p id="player-status">{player.isActive ? "active" : "inactive"}</p>
    </div>
  );
};
export default SelectedPlayer;