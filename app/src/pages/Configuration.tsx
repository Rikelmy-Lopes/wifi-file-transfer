import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MIN_PORT } from "../constants/app";
import { configManager } from "../config/ConfigManager";
import { isPortInRange } from "../utils/utils";

function Configuration() {
  const [port, setPort] = useState(MIN_PORT);
  const [message, setMessage] = useState("");

  function validatePort(port: string) {
    const REGEX_ONLY_NUMBERS = /^[0-9]*$/;
    if (REGEX_ONLY_NUMBERS.test(port)) {
      setPort(Number(port));
    }
  }

  function displayWarn(message: string, setState: Dispatch<SetStateAction<string>>) {
    setState(message);
    setTimeout(() => {
      setState("");
    }, 2000);
  }

  async function preSave() {
    if (!isPortInRange(port)) {
      displayWarn("Valor da porta invalido!", setMessage);
      return;
    }

    await save();
  }

  async function save() {
    const config = await configManager.load();
    configManager.save(config.setServerPort(port));
  }

  async function reset() {
    await configManager.resetToDefaults();
    await load();
  }

  async function load() {
    const config = await configManager.load();
    setPort(config.getServerPort());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <div>
        <label htmlFor="port">Porta: </label>
        <input type="text" id="port" value={port ? port : ""} onChange={({ target }) => validatePort(target.value)} />
      </div>
      <div>
        <button onClick={preSave}>Salvar</button>
        <button onClick={reset}>Resetar</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Configuration;
