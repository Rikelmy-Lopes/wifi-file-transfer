import { BaseDirectory, exists, mkdir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { Config } from "./Config";

class ConfigManager {
  private readonly BASE_DIR: BaseDirectory;
  private readonly CONFIG_FOLDER_PATH = "config";
  private readonly CONFIG_FILE_PATH = `${this.CONFIG_FOLDER_PATH}/config.json`;

  constructor(baseDir: BaseDirectory) {
    this.BASE_DIR = baseDir;
  }

  public async load(): Promise<Config> {
    const fileExists = await this.configExists();

    if (fileExists) {
      const config = await readTextFile(this.CONFIG_FILE_PATH, { baseDir: this.BASE_DIR });

      return new Config(config);
    }
    throw new Error("File does not exists!");
  }

  public async save(config: Config): Promise<void> {
    const fileExists = await this.configExists();

    if (!fileExists) {
      await mkdir(this.CONFIG_FOLDER_PATH, { baseDir: this.BASE_DIR });
    }

    await writeTextFile(this.CONFIG_FILE_PATH, config.toString(), {
      baseDir: this.BASE_DIR,
    });
  }

  public resetToDefaults(): void {
    this.save(new Config());
  }

  private async configExists(): Promise<boolean> {
    return await exists(this.CONFIG_FILE_PATH, { baseDir: this.BASE_DIR });
  }
}

export const configManager = new ConfigManager(BaseDirectory.AppLocalData);
