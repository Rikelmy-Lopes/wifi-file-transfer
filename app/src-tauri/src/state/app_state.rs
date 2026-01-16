use std::sync::Mutex;

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};

#[derive(Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AppState {
    pub server_port: u64,
    pub server_ip: String,
}

#[tauri::command]
pub fn get_state(app: AppHandle) -> AppState {
    let state = app.state::<Mutex<AppState>>();

    return state.lock().unwrap().clone();
}
