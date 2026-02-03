const url = "http://localhost:3001/api/players";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";

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