mod constants;
mod fs;
mod http;
mod state;
mod utils;
use std::{path::PathBuf, sync::Mutex};

use http::server::{start_server, stop_server};
use state::app_state::get_state;
use tauri::Manager;
use utils::os::get_current_ip;

use crate::{
    constants::constants::WEBAPP_RESOURCE_PATH, state::app_state::AppState,
    utils::resource::resolve_resource_path,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let webapp_path =
                resolve_resource_path(app.handle(), &PathBuf::from(WEBAPP_RESOURCE_PATH)).unwrap();

            let state = Mutex::new(AppState {
                webapp_path,
                ..AppState::default()
            });

            app.manage(state);
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            start_server,
            stop_server,
            get_current_ip,
            get_state,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
