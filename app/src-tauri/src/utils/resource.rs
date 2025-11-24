use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::{path::BaseDirectory, AppHandle};
use tauri::{Manager, State};

use crate::constants::constants::WEBAPP_RESOURCE_PATH_DEV;
use crate::state::app_state::AppState;

pub fn resolve_resource_path(handle: &AppHandle, path: &PathBuf) -> Option<String> {
    match handle.path().resolve(path, BaseDirectory::Resource) {
        Ok(path) => Some(path.display().to_string()),
        Err(e) => {
            let error_message = format!(
                "Falha ao resolver caminho do recurso: {}\n{}",
                path.display().to_string(),
                e
            );
            println!("{}", error_message);
            None
        }
    }
}

pub fn get_webapp_path(state: &State<'_, Mutex<AppState>>) -> String {
    if cfg!(debug_assertions) {
        let absolute_path = fs::canonicalize(WEBAPP_RESOURCE_PATH_DEV)
            .unwrap()
            .to_str()
            .unwrap()
            .to_string();
        String::from(absolute_path)
    } else {
        let state = state.lock().unwrap();
        state.webapp_path.clone()
    }
}
