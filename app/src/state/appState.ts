import { invoke } from "@tauri-apps/api/core";

export interface AppState {
  serverIp: string;
  serverPort: number;
}

export async function getAppState(): Promise<AppState> {
  return await invoke<AppState>("get_state");
}
