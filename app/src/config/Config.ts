import { MAX_PORT, MIN_PORT } from "../constants/app";
import { isPortInRange } from "../utils/utils";

export interface IConfig {
  serverPort: number;
}

export class Config {
  private serverPort: number = MIN_PORT;

  constructor(config?: string) {
    if (config) {
      const parsedConfig = JSON.parse(config) as IConfig;
      this.setServerPort(parsedConfig.serverPort);
    }
  }

  public getServerPort() {
    return this.serverPort;
  }

  public setServerPort(port: number): Config {
    if (!isPortInRange(port)) {
      throw new RangeError(`Port must be between ${MIN_PORT} and ${MAX_PORT}`);
    }

    this.serverPort = port;
    return this;
  }

  public toString() {
    return JSON.stringify(this);
  }
}
