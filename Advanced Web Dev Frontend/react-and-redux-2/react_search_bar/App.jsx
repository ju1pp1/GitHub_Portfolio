/** @format 
 * 
 * Useful to read:
 * https://react.dev/
 * 
  Short instructions
  ------------------
  Use the provided components to create a React app that fetches players from the provided API and displays them in a list when the App is first rendered. When a player is clicked in the list, fetch that player and display it in the selected player section. Give ListPlayer a function as its selectPlayer prop: it is used to fetch a specific player and should take a player id as its only argument. 
  

  This is the main component of the application. It is used to fetch and store the players data upon creation, and to display the list of players and the selected player.

  1. Inside the root div element, import and add the  RequestStatus, ListPlayers, and SelectedPlayer components as child elements. Remember to pass in the appropriate props and content to the child components.

  2. Create two methods for fetching all players and fetching one specific player. The first method should handle the logic for fetching all the players and displaying them in the players array. The second method should handle the logic for fetching a specific player and relaying that specific player to the SelectedPlayer component. Use the REQ_STATUS object to display the appropriate status message when the request is loading, when it is successful, and when it fails. 
  
  The URLS for fetching all players and fetching a specific player remain the same throughout the course (http://localhost:3001/api/players, http://localhost:3001/api/players/:id). Once the backend is running, you can visit http://localhost:3001 to see the API documentation.

  3. Whenever the page is refreshed, fetch players data, store and display it.

	REMEMBER: use correct ids, classes and attributes in the correct places to pass the tests. Remember to pass in the appropriate props to the child components.	Beware: the tests will not pass if you use the wrong props. 
	
  HINT: Use the provided REQ_STATUS object to update the request status when necessary. Use "loading" key for when the request is in progress, "success" key for when the request is successful, and "error" for when the request has failed. The REQ_STATUS object is now imported from the ../cypress/e2e/constants.js file and should not be modified.

  As we are just getting started with React, one possible path to solution is provided below using React Hooks. You can use it as a reference, or better yet use your own and better approach to complete the exercise.
  ---------------------------------------------------------------------------------------------------------------
  Step 1: Import React Hooks
    Add useState and useEffect to manage state and handle side effects.

  Step 2: Add State Variables
    Define three state variables:
      status – To track the request status (loading, success, or error).
      players – To store the list of players fetched from the API.
      currentPlayer – To store details of the currently selected player.

  Step 3: Implement Initial Data Fetch
    Use useEffect to fetch the list of players when the component loads:
      Set status to "loading" and clear any existing players.
      Fetch data from the API and update players and status accordingly.
      Handle errors by setting status to "error."

  Step 4: Add a Function to Fetch Player Details
    Create a function to fetch details of a specific player when a player is selected:
      Update status to "loading."
      Fetch player details using the player's ID.
      Update currentPlayer and status based on the response.
      Handle errors by setting status to "error."

  Step 5: Update the Return Statement
    Render the following components within the root div
      RequestStatus: Display the current request status.
      ListPlayers: Render the list of players and pass the player-fetching function as a prop.
      SelectedPlayer: Render details of the currently selected player.

*/

const url = "http://localhost:3001/api/players";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";

// Import React Hooks
import React, { useState, useEffect } from 'react';

function App() {

  // Add State Variables
  const [status, setStatus] = useState(REQ_STATUS.idle);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  // Implement Initial Data Fetch  
  const fetchPlayers = async () => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error("Failed to fetch players");
      const data = await response.json();
      setPlayers(data);
      setStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setStatus(REQ_STATUS.error);
    }
  };

  // Add a Function to Fetch Player Details
  const fetchPlayer = async (id) => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch(`${url}/${id}`);
      if(!response.ok) throw new Error("Failed to fetch player");
      const data = await response.json();
      setCurrentPlayer(data);
      setStatus(REQ_STATUS.success);
    } catch (error) {
      console.error(error);
      setStatus(REQ_STATUS.error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);
  
  // Update the Return Statement
  return <div>
    <RequestStatus>
      {status === REQ_STATUS.loading && "Loading..."}
      {status === REQ_STATUS.success && "Finished!"}
      {status === REQ_STATUS.error && "Error fetching data"}
    </RequestStatus>
    <ListPlayers players={players} getPlayer={fetchPlayer} />
    <SelectedPlayer player={currentPlayer} />
  </div>;
}

export default App;
