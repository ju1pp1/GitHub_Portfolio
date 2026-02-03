/** @format 
 * 
 * Student instructions:
 * Copy paste the App.jsx file from the previous exercises into this file. In this exercise, you will be introducing redux, which is a state management library that allows you to manage the state of your application in a single store. The store is a single source of truth for the state of your application, and it is the only place where the state can be updated. 
 * 
 * The fetch functions will start using action creators from now on. Each action creator will be responsible for updating the redux store with the data from the request. You can find the template files for the action creators in the src/redux/actionCreators folder. It is your job to implement them, as well as the reducers that will be used to update the store. The reducers can be found in the src/redux/reducers folder.
 * 
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. "loading" for when the request is in progress, "success" for when the request is successful, and "error" for when the request has failed. The REQ_STATUS object is imported from the "../cypress/e2e/constants.js" file.

*/
/*
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { REQ_STATUS } from "../cypress/e2e/constants.js";

function App() {
  return (
    <>
      <RequestStatus />
      <ListPlayers />
      <SelectedPlayer />
    </>
  );
}

export default App;
*/
const url = "http://localhost:3001/api/players";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";

// Import React Hooks
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {setPlayers} from "./redux/actionCreators/playersActions.js";
import {setSelectedPlayer} from "./redux/actionCreators/selectedPlayerActions.js";
import {setStatus} from "./redux/actionCreators/statusActions.js";

function App() {

  const dispatch = useDispatch();
  const players = useSelector((state) => state.players);
  const status = useSelector((state) => state.status);

  // Implement Initial Data Fetch  
  const fetchPlayers = async () => {
    dispatch(setStatus(REQ_STATUS.loading));
    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error("Failed to fetch players");
      const data = await response.json();
      dispatch(setPlayers(data));
      dispatch(setStatus(REQ_STATUS.success));
    } catch (error) {
      console.error(error);
      dispatch(setStatus(REQ_STATUS.error));
    }
  };

  // Add a Function to Fetch Player Details
  const fetchPlayer = async (id) => {
    dispatch(setStatus(REQ_STATUS.loading));
    try {
      const response = await fetch(`${url}/${id}`);
      if(!response.ok) throw new Error("Failed to fetch player");
      const data = await response.json();
      dispatch(setSelectedPlayer(data));
      dispatch(setStatus(REQ_STATUS.success));
    } catch (error) {
      console.error(error);
      dispatch(setStatus(REQ_STATUS.error));
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);
  
  // Update the Return Statement
  return <div>
    <RequestStatus />
    <ListPlayers selectPlayer={fetchPlayer} />
    <SelectedPlayer />
  </div>;
}

export default App;