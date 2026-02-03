/** @format
 *
 * Short instructions:
 * Create a AddPlayer component.
 *
 * handleSubmit is a prop function that will be called when the form is submitted.
 *
 * REMEMBER: use right ids, classes and attributes in the exercise, refer to the tests.
 *
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
      <button type="submit" className="btn-add">Submit</button>
    </form>
  </div>
  );
};
export default AddPlayer;
