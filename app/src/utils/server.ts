import { invoke } from "@tauri-apps/api/core";

export async function startServer(port: number) {
  await invoke("start_server", { port });
}

export async function stopServer() {
  await invoke("stop_server");
}

export async function getIp() {
  return (await invoke("get_current_ip")) as string;
}
