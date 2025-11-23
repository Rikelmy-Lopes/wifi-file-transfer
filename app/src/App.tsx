import { useEffect, useState } from "react";
import "./App.css";
import { startServer, stopServer } from "./utils/server";
import { AppState, getAppState } from "./state/appState";

function App() {
  const [port, setPort] = useState(49152);
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isServerRunning, setIsServerRunning] = useState(false);

  function onStartServer() {
    const MIN_PORT = 49152;
    const MAX_PORT = 65535;
    if (port < MIN_PORT || port > MAX_PORT) return;

    startServer(port);
    setIsServerRunning(true);
  }
  function displayServerLink() {
    if (!isServerRunning) {
      return null;
    }

    if (appState == null) {
      return null;
    }

    const link = `http://${appState.serverIp}:${appState.serverPort}`;

    return (
      <div>
        <span>Server running on: </span>
        <a href={link} target="_blank">
          {link}
        </a>
      </div>
    );
  }

  useEffect(() => {
    (async () => {
      const state = await getAppState();
      setAppState(state);
    })();
  }, [isServerRunning]);

  return (
    <div className="container">
      <button onClick={onStartServer} disabled={isServerRunning}>
        Start Server
      </button>
      <button
        onClick={() => {
          stopServer();
          setIsServerRunning(false);
        }}
        disabled={!isServerRunning}
      >
        Stop Server
      </button>
      <input type="number" min={49152} max={65535} value={port} onChange={({ target }) => setPort(Number(target.value))} />
      {displayServerLink()}
    </div>
  );
}

export default App;
