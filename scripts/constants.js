import { join } from "node:path";

export const ROOT_PATH = process.cwd();

export const APP_PATH = join(ROOT_PATH, "app");
export const WEBUI_PATH = join(APP_PATH, "web-ui");
export const TAURI_PATH = join(APP_PATH, "src-tauri");
export const WEBAPP_RES_PATH_PROD = join(TAURI_PATH, "resources/webapp");
export const WEBAPP_RES_PATH_DEV = join(APP_PATH, "webapp");
export const WEBUI_SRC_PATH = join(WEBUI_PATH, "src");
export const APP_DIST_PATH = join(APP_PATH, "dist");
export const NODE_MODULES_APP = join(APP_PATH, "node_modules");
export const NODE_MODULES_WEBUI = join(WEBUI_PATH, "node_modules");
export const RUST_TARGET_PATH = join(ROOT_PATH, "target");
