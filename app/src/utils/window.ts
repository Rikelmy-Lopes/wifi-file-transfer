import { Webview } from "@tauri-apps/api/webview";
import { PhysicalSize, Window } from "@tauri-apps/api/window";
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_POSITION_X,
  DEFAULT_WINDOW_POSITION_Y,
  DEFAULT_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
} from "../constants/app";

export function createWebviewWindow(path: string, title: string, id: string): Promise<[Window, Webview]> {
  const minSize = new PhysicalSize(MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT);

  return new Promise((resolve, reject) => {
    const window = new Window(id, {
      x: DEFAULT_WINDOW_POSITION_X,
      y: DEFAULT_WINDOW_POSITION_Y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
      title,
    });

    window.once("tauri://created", async function () {
      const webview = new Webview(window, id, {
        url: path,
        x: DEFAULT_WINDOW_POSITION_X,
        y: DEFAULT_WINDOW_POSITION_Y,
        width: DEFAULT_WINDOW_WIDTH,
        height: DEFAULT_WINDOW_HEIGHT,
      });

      webview.once("tauri://error", function (e) {
        reject(e);
      });

      window.onResized(async ({ payload: size }) => {
        await webview.setSize(size);
      });

      window.setMinSize(minSize);

      resolve([window, webview]);
    });

    window.once("tauri://error", function (e) {
      reject(e);
    });
  });
}
