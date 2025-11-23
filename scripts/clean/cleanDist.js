import { rm } from "fs/promises";
import { APP_DIST_PATH, WEBAPP_RES_PATH } from "../constants.js";

(async () => {
  await Promise.all([
    rm(APP_DIST_PATH, { recursive: true, force: true }),
    rm(WEBAPP_RES_PATH, { recursive: true, force: true }),
  ])
})();