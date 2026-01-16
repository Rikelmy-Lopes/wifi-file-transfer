import { useEffect, useState } from "react";
import { startServer, stopServer } from "../utils/server";
import { AppState, getAppState } from "../state/appState";
import { blockDevTools } from "../utils/blockDevTools";
import { MIN_PORT } from "../constants/app";
import { createWebviewWindow } from "../utils/window";
import { isPortInRange } from "../utils/utils";

function Main() {
  const [port, setPort] = useState(MIN_PORT);
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isServerRunning, setIsServerRunning] = useState(false);
  blockDevTools();

  async function onStartServer() {
    const [configWindow, configWebview] = await createWebviewWindow("/config", "Configuração", "teste");
    if (isServerRunning) return;
    if (!isPortInRange(port)) return;

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
        <span>Servidor rodando em: </span>
        <a href={link} target="_blank">
          {link}
        </a>
      </div>
    );
  }

  function validatePort(port: string) {
    const REGEX_ONLY_NUMBERS = /^[0-9]*$/;
    if (REGEX_ONLY_NUMBERS.test(port)) {
      setPort(Number(port));
    }
  }

  useEffect(() => {
    (async () => {
      const state = await getAppState();
      setAppState(state);
    })();
  }, [isServerRunning]);

  return (
    <>
      <div className="container">
        <button onClick={onStartServer} disabled={isServerRunning || !isPortInRange(port)}>
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
        <input
          type="text"
          value={port ? port : ""}
          onChange={({ target }) => validatePort(target.value)}
          disabled={isServerRunning}
        />
      </div>
      {displayServerLink()}
    </>
  );
}

export default Main;
