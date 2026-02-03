/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/
/*
export const SelectedPlayer = () => {
	return (
		<div>
			<h3>Selected Player</h3>
			TODO: SelectedPlayer
		</div>
	);
};
*/
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedPlayer } from '../redux/actionCreators/thunks/SelectedPlayer';
import { updateSelectedPlayer } from '../redux/actionCreators/thunks/SelectedPlayer';

export const SelectedPlayer = () => {
	const player = useSelector((state) => state.selectedPlayer);
	const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false); // player.isActive ?? 
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
	if(player) {
		setIsActive(player.isActive ?? false);
		setIsModified(false);
	}
  }, [player]);

  if (!player) return null;

  const handleUpdateClick = () => {
	dispatch(updateSelectedPlayer(isActive));
	setIsModified(false);
  };

  return (
    <div id="selected-player">
        <h2>Selected player</h2>
        <h2 id="player-id">{player.id}</h2>
        <h2 id="player-name">{player.name}</h2>
        <p id="player-status">{player.isActive ? "active" : "inactive"}</p>
        <div>
            <label id="checkbox-label" >
                Active Status:
                <input
                id="checkbox"
                type="checkbox"
                checked={isActive}
                onChange={(e) => {
					setIsActive(e.target.checked);
					setIsModified(e.target.checked !== player?.isActive);
				}}
                />
            </label>
        </div>
        <button
        className="btn-update" onClick={handleUpdateClick} disabled={!isModified}>
        Update</button>
        <button className="btn-delete" onClick={() => dispatch(deleteSelectedPlayer())}>Delete</button>
    </div>
  );
};
export default SelectedPlayer;
