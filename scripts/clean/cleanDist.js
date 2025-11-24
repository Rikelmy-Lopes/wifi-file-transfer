import { rm } from "fs/promises";
import { APP_DIST_PATH, WEBAPP_RES_PATH_DEV, WEBAPP_RES_PATH_PROD } from "../constants.js";

(async () => {
  await Promise.all([
    rm(APP_DIST_PATH, { recursive: true, force: true }),
    rm(WEBAPP_RES_PATH_DEV, { recursive: true, force: true }),
    rm(WEBAPP_RES_PATH_PROD, { recursive: true, force: true }),
  ])
})();