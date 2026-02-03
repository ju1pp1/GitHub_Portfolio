import './App.css';
import React, { useState, useEffect, useRef} from 'react'

function App() {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  let ws;

  const [settings, setSettings] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);


  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:3000');

    // Handle WebSocket events
    ws.onopen = () => {
      setConnected(true);
      console.log('Connected to WebSocket');
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('Disconnected from WebSocket');
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Clean up WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to the bottom of the container
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  // Fetch initial settings
  useEffect(() => {
    fetch('http://localhost:4000/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
      })
      .catch(err => console.error("Failed to fetch settings", err));
  }, []);

 // Update settings function
 const updateSettings = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      setStatusMessage(data.message || 'Settings updated successfully');
      // Re-fetch updated settings
      return fetch('http://localhost:4000/settings');
    })
    .then((res) => res.json())
    .then((data) => setSettings(data))
    .catch((err) => {
      setStatusMessage('Error updating settings');
      console.error('Error:', err);
    });
};

  // What app displays on screen
  // In chat-containener app displays input coming from server A
  // In settings app displays where you can change settings on server B
  // In current-setting app displays current settings of server B
  return (
    <div className="App">
      <div className="chat-container" ref={chatContainerRef}>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      </div>

      <hr />

      <h2>Emote Aggregation Settings</h2>
      <div className="settings">
        {/* Update Interval */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSettings('http://localhost:4000/settings/interval', {
              interval: parseInt(e.target.interval.value),
            });
          }}
        >
          <label>Interval:</label>
          <input
            type="number"
            name="interval"
            defaultValue={settings?.interval || 100}
          />
          <button type="submit">Update Interval</button>
        </form>

        {/* Update Threshold */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSettings('http://localhost:4000/settings/threshold', {
              threshold: parseFloat(e.target.threshold.value),
            });
          }}
        >
          <label>Threshold (0-1):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            name="threshold"
            defaultValue={settings?.threshold || 0.2}
          />
          <button type="submit">Update Threshold</button>
        </form>

        {/* Update Allowed Emotes */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const emotes = e.target.emotes.value
              .split(',')
              .map((e) => e.trim());
              updateSettings('http://localhost:4000/settings/allowed-emotes', {
              allowedEmotes: emotes,
            });
          }}
        >
          <label>Allowed Emotes (comma-separated):</label>
          <input
            type="text"
            name="emotes"
            defaultValue={settings?.allowedEmotes?.join(',') || ''}
          />
          <button type="submit">Update Emotes</button>
        </form>
      </div>

      <hr />

      <div className="current-settings">
        <h3>Current Settings</h3>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;