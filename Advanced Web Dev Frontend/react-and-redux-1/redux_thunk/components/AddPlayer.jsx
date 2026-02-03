/** @format
 *
 * Student instructions:
 *  * Copy contents for this file from the previous exercise round's exercises
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - postPlayer, found in src\redux\actionCreators\thunks\AddPlayer.jsx
 */
/*
export const AddPlayer = () => {
	return (
		<div>
			<h2>Add player</h2>
			TODO: AddPlayer
		</div>
	);
};
*/
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { postPlayer } from '../redux/actionCreators/thunks/AddPlayer';

export const AddPlayer = () => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();

  	const handleFormSubmit = (e) => {
    	e.preventDefault();
    	if(!name.trim()) return;
		dispatch(postPlayer({name, isActive: false}));
    	setName("");
  	};

  return ( 
  <div>
    <form id="add-player-form" onSubmit={handleFormSubmit}>
      <label htmlFor='input-player'>Name:</label>
        <input
        type="text"
        id="input-player"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      <button type="submit" className="btn-add">Submit</button>
    </form>
  </div>
  );
};
export default AddPlayer;