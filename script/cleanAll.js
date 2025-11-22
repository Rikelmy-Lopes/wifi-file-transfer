import { rm } from "fs/promises";
import { APP_CWD, APP_WEB_UI, APP_WEB_APP_RESOURCE } from "./constants.js";
import { join } from "path";

(async () => {
  await rm(join(APP_CWD, "node_modules"), { recursive: true, force: true });
  await rm(join(APP_WEB_UI, "node_modules"), { recursive: true, force: true });

  await rm(join(APP_CWD, "dist"), { recursive: true, force: true });
  await rm(join(APP_WEB_APP_RESOURCE), { recursive: true, force: true });
})();
  