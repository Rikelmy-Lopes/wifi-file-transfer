import { Config } from "./Config";

export class ConfigManager {
  public load(): Promise<Config> {
    throw new Error();
  }

  public save(config: Config): Promise<boolean> {
    throw new Error();
  }

  public resetToDefaults(): void {
    throw new Error();
  }
}
