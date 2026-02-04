import { BaseDirectory, exists, mkdir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { Config } from "./Config";
import { emit, listen } from "@tauri-apps/api/event";

class ConfigManager {
  private static instance: ConfigManager | null = null;
  private readonly BASE_DIR: BaseDirectory;
  private readonly CONFIG_FOLDER_PATH = "config";
  private readonly CONFIG_FILE_PATH = `${this.CONFIG_FOLDER_PATH}/config.json`;
  private readonly SYNC_EVENT = "config-changed";
  private current: Config | null = null;

  private constructor(baseDir: BaseDirectory) {
    this.BASE_DIR = baseDir;
    this.setupListeners();
  }

  public static getInstance(baseDir: BaseDirectory): ConfigManager {
    if (ConfigManager.instance === null) {
      ConfigManager.instance = new ConfigManager(baseDir);
    }

    return ConfigManager.instance;
  }

  public async load(): Promise<Config> {
    const configExists = await this.configExists();

    if (!configExists) {
      await this.resetToDefaults();
      return this.current as Config;
    }

    const config = await readTextFile(this.CONFIG_FILE_PATH, { baseDir: this.BASE_DIR });
    this.current = new Config(config);

    return this.current;
  }

  public async save(config: Config): Promise<void> {
    const configExists = await this.configExists();

    if (!configExists) {
      await mkdir(this.CONFIG_FOLDER_PATH, { baseDir: this.BASE_DIR, recursive: true });
    }

    const content = config.toString();
    await writeTextFile(this.CONFIG_FILE_PATH, content, {
      baseDir: this.BASE_DIR,
    });

    this.current = config;

    await emit(this.SYNC_EVENT, content);
  }

  public async resetToDefaults(): Promise<void> {
    await this.save(new Config());
  }

  public async getCurrent(): Promise<Config> {
    if (this.current === null) {
      await this.load();
    }

    return this.current as Config;
  }

  private async configExists(): Promise<boolean> {
    return await exists(this.CONFIG_FILE_PATH, { baseDir: this.BASE_DIR });
  }

  private async setupListeners() {
    await listen(this.SYNC_EVENT, (event: any) => {
      this.current = new Config(event.payload);
    });
  }
}

export const configManager = ConfigManager.getInstance(BaseDirectory.AppLocalData);
