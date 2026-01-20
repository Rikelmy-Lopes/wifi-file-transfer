import { useEffect, useState } from "react";
import { blockDevTools } from "../utils/blockDevTools";
import { MIN_PORT } from "../constants/app";
import { configManager } from "../config/ConfigManager";
import { isPortInRange } from "../utils/utils";

function Configuration() {
  const [port, setPort] = useState(MIN_PORT);
  blockDevTools();

  function validatePort(port: string) {
    const REGEX_ONLY_NUMBERS = /^[0-9]*$/;
    if (REGEX_ONLY_NUMBERS.test(port)) {
      setPort(Number(port));
    }
  }

  async function salvar() {
    const config = await configManager.load();
    configManager.save(config.setServerPort(port));
  }

  useEffect(() => {
    (async () => {
      const config = await configManager.load();
      setPort(config.getServerPort());
    })();
  }, []);

  return (
    <div className="container">
      <div>
        <label htmlFor="port">Porta: </label>
        <input type="text" id="port" value={port ? port : ""} onChange={({ target }) => validatePort(target.value)} />
      </div>
      <div>
        <button onClick={salvar} disabled={!isPortInRange(port)}>
          Salvar
        </button>
      </div>
    </div>
  );
}

export default Configuration;
