/** @format */

/** @format
 * @description
 * Student instructions:
 * Copy contents for this file from the react_fetch exercise of the react week.
 *
 * BEWARE: No props are passed to this component from now on. Instead, the selectedPlayer is fetched from the redux store.

 */
/*
export const SelectedPlayer = () => {
  return (
    <div>
      <h3>Selected Player</h3>
      TODO: SelectedPlayer
    </div>
  );
};*/
import React from 'react';
import { useSelector } from 'react-redux';

export const SelectedPlayer = () => {
  const player = useSelector((state) => state.selectedPlayer);
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
