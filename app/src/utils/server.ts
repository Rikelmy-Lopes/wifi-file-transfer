import { invoke } from "@tauri-apps/api/core";

export const startServer = () => {
  invoke("start_server", { port: 1234 });
};

export const stopServer = async () => {
  invoke("stop_server");
};

export const getIp = async () => {
  return (await invoke("get_current_ip")) as String;
};
