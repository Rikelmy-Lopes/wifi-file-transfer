import { MAX_PORT, MIN_PORT } from "../constants/app";
import { isPortInRange } from "../utils/utils";

export interface IConfig {
  serverPort: number;
  serverPassword: string;
}

export class Config {
  private serverPort: number = MIN_PORT;
  private serverPassword: string = "";

  constructor(config: string) {
    const parsedConfig = JSON.parse(config) as IConfig;
    this.setServerPort(parsedConfig.serverPort);
    this.setServerPassword(parsedConfig.serverPassword);
  }

  getServerPort() {
    return this.serverPort;
  }

  setServerPort(port: number): Config {
    if (!isPortInRange(port)) {
      throw new RangeError(`Port must be between ${MIN_PORT} and ${MAX_PORT}`);
    }

    this.serverPort = port;
    return this;
  }

  getServerPassword() {
    return this.serverPassword;
  }

  setServerPassword(serverPassword: string): Config {
    this.serverPassword = serverPassword;
    return this;
  }
}
