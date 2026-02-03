/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the right ids, classes and attributes in the exercise to pass the tests. Remember to pass in the appropriate props to the child components.

 * BEWARE: the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
 *
 */
import { AddPlayer } from "./components/AddPlayer.jsx";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
const url = "http://localhost:3001/api/players";

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

  const addPlayer = async (name) => {
    setStatus(REQ_STATUS.loading);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                name,
                isActive: false,
            }),
        });

        if(!response.ok) throw new Error("Failed to add player");

        const newPlayer = await response.json();
        setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
        //await fetchPlayers();
        setCurrentPlayer(null);
        setStatus(REQ_STATUS.success);
    } catch (error) {
        console.error(error);
        setStatus("An error has occurred!!!");
    }
  };
  
  const updatePlayer = async (id, updatedData) => {
    setStatus(REQ_STATUS.loading);
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if(!response.ok) throw new Error("Failed to update player");

        const updatedPlayer = await response.json();
        setPlayers((prevPlayers) => prevPlayers.map((player) => player.id === id ? { ...player, ...updatedPlayer} : player ));
        setCurrentPlayer(null);
        //fetchPlayers();
        setStatus(REQ_STATUS.success);
    } catch (error) {
        console.error(error);
        setStatus("An error has occurred!!!");
    }
  };

  const deletePlayer = async (id) => {
    setStatus(REQ_STATUS.loading);
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
        
        if(!response.ok) throw new Error("Failed to delete player");
        //TESTING
        /*setPlayers((prevPlayers) => {
            const updatedPlayers = prevPlayers.filter((player) => player.id !== id);
            console.log("Updated players after delete:", updatedPlayers); // Log the updated state here
            return updatedPlayers;
          });*/
          
        setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
        setCurrentPlayer(null);
        //console.log("Updated players after delete:", players);
        setStatus(REQ_STATUS.success);
        await new Promise((resolve) => setTimeout(resolve, 50));
        //await fetchPlayers();
    } catch (error) {
        console.error(error);
        setStatus("An error has occurred!!!");
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
      {status === REQ_STATUS.error && "An error has occurred!!!"}
    </RequestStatus>
    <AddPlayer handleSubmit={addPlayer}></AddPlayer>
    <ListPlayers players={players} getPlayer={fetchPlayer} />
    <SelectedPlayer
    player={currentPlayer}
    handleUpdate={updatePlayer}
    handleDelete={deletePlayer}
    />
  </div>;
}

export default App;
