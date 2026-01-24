import { currentMonitor, PhysicalSize } from "@tauri-apps/api/window";
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_POSITION_X,
  DEFAULT_WINDOW_POSITION_Y,
  DEFAULT_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
} from "../constants/app";
import { getAllWebviewWindows, getCurrentWebviewWindow, WebviewWindow } from "@tauri-apps/api/webviewWindow";

export async function createWebviewWindow(path: string, title: string, id: string): Promise<WebviewWindow> {
  const minSize = new PhysicalSize(MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT);
  const monitor = await currentMonitor();
  let x: number = DEFAULT_WINDOW_POSITION_X;
  let y: number = DEFAULT_WINDOW_POSITION_Y;

  if (monitor) {
    x = monitor.size.width / 2 - DEFAULT_WINDOW_WIDTH / 2;
    y = monitor.size.height / 2 - DEFAULT_WINDOW_HEIGHT / 2;
  }

  return new Promise((resolve, reject) => {
    const webviewWindow = new WebviewWindow(id, {
      x,
      y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
      title,
      url: path,
    });

    webviewWindow.once("tauri://error", function (e) {
      reject(e);
    });

    webviewWindow.once("tauri://window-created", async () => {
      await webviewWindow.setMinSize(minSize);
      resolve(webviewWindow);
    });
  });
}

export async function onMainWindowClose() {
  const window = getCurrentWebviewWindow();
  if (window.label === "main") {
    window.onCloseRequested(async () => {
      const windows = await getAllWebviewWindows();
      for (const win of windows) {
        await win.close();
      }
    });
  }
}
