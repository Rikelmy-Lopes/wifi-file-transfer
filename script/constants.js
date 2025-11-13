import { join } from "path";

const CWD = process.cwd();

export const APP_CWD = join(CWD, "app");
export const APP_WEB_UI = join(APP_CWD, "web-ui");
