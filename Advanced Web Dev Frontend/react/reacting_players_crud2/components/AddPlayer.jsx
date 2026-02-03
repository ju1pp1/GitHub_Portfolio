/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import React, {useState} from 'react'

export const AddPlayer = ({handleSubmit}) => {

  const [name, setName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(name); // Here we call handleSubmit with new player data.
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
      <button id="submit-player" className="btn-add" type="submit">Submit</button>
    </form>
  </div>
  );
};
export default AddPlayer;