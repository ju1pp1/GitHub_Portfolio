/** @format 

 * Copy paste your code from the App.jsx file here from the previous exercise. 
 * 
 * Add authentication to the app. 
 *  
 * Backend is still using Basic Auth. 
 * 
 * REMEMBER: use the correct ids, classes and attributes in the exercise in the correct places to pass the tests. Remember to pass in the appropriate props to the child components.  
 * BEWARE: the tests will not pass if you use the wrong props. 
 */

import { AuthUser } from "./components/AuthUser.jsx";
const url = "http://localhost:3001";
//const fetchPlayerUrl = "http://localhost:3001/api/players"; 
import { AddPlayer } from "./components/AddPlayer.jsx";
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [authToken, setAuthToken] = useState("");

    // Implement Initial Data Fetch   
    const fetchPlayers = async () => {

        if (!isLoggedIn) return;

        setStatus(REQ_STATUS.loading);
        try {
            const response = await fetch(`${url}/api/players`, {
                headers: { Authorization: `Basic ${authToken}` },
            });

            if (!response.ok) throw new Error("Failed to fetch players");

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
            const response = await fetch(`${url}/api/players/${id}`, {
                headers: {Authorization: `Basic ${authToken}` },
            });

            if (!response.ok) throw new Error("Failed to fetch player");
            const data = await response.json();
            setCurrentPlayer(data);
            setStatus(REQ_STATUS.success);
        } catch (error) {
            console.error(error);
            setStatus(REQ_STATUS.error);
        }
    };

    const onLogin = async (username, password) => {
        setStatus(REQ_STATUS.loading);
        try {
            const token = btoa(`${username}:${password}`);
            setAuthToken(token);
            const response = await fetch(`${url}/api/players`, {
                headers: { Authorization: `Basic ${token}` },
            });

            if (!response.ok) throw new Error("Login failed");
            
            setIsLoggedIn(true);
            const data = await response.json();
            setPlayers(data);
            setStatus(REQ_STATUS.success);
        } catch (error) {
            setStatus(REQ_STATUS.error);
            console.error(error);
        }
    };

    const onRegister = async (username, password) => {
        setStatus(REQ_STATUS.loading);
        try {
            const response = await fetch(`${url}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error("Register failed");
            await onLogin(username, password);
            setStatus(REQ_STATUS.success);

        } catch (error) {
            setStatus(REQ_STATUS.error);
            console.error(error); 
        }
    };

    const onLogout = () => {
        setIsLoggedIn(false);
        setAuthToken("");
        setPlayers([]);
        setCurrentPlayer(null);
    };

    const addPlayer = async (name) => {
        setStatus(REQ_STATUS.loading);
        try {
            const response = await fetch(`${url}/api/players`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authToken}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    isActive: false,
                }),
            });

            if (!response.ok) throw new Error("Failed to add player");

            const newPlayer = await response.json();
            setPlayers((prevPlayers) => [...prevPlayers, newPlayer]); 
            setCurrentPlayer(null);
            setStatus(REQ_STATUS.success);

        } catch (error) {
            console.error(error);
            setStatus(REQ_STATUS.error);
        }
    };

    const updatePlayer = async (id, updatedData) => {
        setStatus(REQ_STATUS.loading);
        try {
            const response = await fetch(`${url}/api/players/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Basic ${authToken}`,
                    "Content-type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error("Failed to update player");

            const updatedPlayer = await response.json();
            setPlayers((prevPlayers) => prevPlayers.map((player) => player.id === id ? { ...player, ...updatedPlayer } : player));
            setCurrentPlayer(null);
            setStatus(REQ_STATUS.success);
        } catch (error) {
            console.error(error);
            setStatus(REQ_STATUS.error);
        }
    };

    const deletePlayer = async (id) => {
        setStatus(REQ_STATUS.loading);
        try {
            const response = await fetch(`${url}/api/players/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Basic ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            
            if (!response.ok) throw new Error("Failed to delete player");

            setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
            setCurrentPlayer(null);
            setStatus(REQ_STATUS.success); 
            await fetchPlayers();
        } catch (error) {
            console.error(error);
            setStatus(REQ_STATUS.error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) fetchPlayers();
    }, [isLoggedIn]);
    
    /* Original
    useEffect(() => {
        fetchPlayers();
    }, []); */

    // Update the Return Statement 
    return (
        <div>
            <RequestStatus>
                {status === REQ_STATUS.loading && "Loading..."}
                {status === REQ_STATUS.success && "Finished!"}
                {status === REQ_STATUS.error && "An error has occurred!!!"}
            </RequestStatus>
            <AuthUser
                isLoggedIn={isLoggedIn}
                onLogin={onLogin}
                onRegister={onRegister}
                onLogout={onLogout}
            />
            {isLoggedIn && (
                <>
                    <AddPlayer handleSubmit={addPlayer} />
                    <ListPlayers players={players} getPlayer={fetchPlayer} />
                    <SelectedPlayer
                        player={currentPlayer}
                        handleUpdate={updatePlayer}
                        handleDelete={deletePlayer}
                    />
                </>
            )}
        </div>
    );

}
export default App;

