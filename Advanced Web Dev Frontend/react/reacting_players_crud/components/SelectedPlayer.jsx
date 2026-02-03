/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in the backend.
 *
 */
import React, {useEffect, useState} from 'react';

export const SelectedPlayer = ({player, handleUpdate, handleDelete}) => {
  if(!player) {
    return null;
  }
  const [isActive, setIsActive] = useState(player.isActive);
  const [isModified, setIsModified] = useState(false);

  // Reset when new player is selected
  useEffect(() => {
    setIsActive(player.isActive);
    setIsModified(false);
  }, [player]);

  const handleUpdateClick = async () => {
    //const updatedData = { ...player, isActive};
    
    //E2e tests work
    const updatedData = { ...player, isActive};
    await handleUpdate(player.id, updatedData);
    
    // Unit tests work
    //await handleUpdate(isActive);
    
    setIsModified(false);
    player.isActive = isActive;
  };

  /*const handleDelete = () => {
    deletePlayer(player.id);
  }; */

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    setIsActive(newValue);
    setIsModified(newValue !== player.isActive);
  }
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
                onChange={handleCheckboxChange}
                />
            </label>
        </div>
        <button
        className="btn-update"
        onClick={handleUpdateClick}
        disabled={!isModified}
        >
        Update</button>
        <button className="btn-delete" onClick={() => handleDelete(player.id)}>Delete</button>
    </div>
  );
};
export default SelectedPlayer;